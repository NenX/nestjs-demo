// import { judgeAreas, setHorRules, setVerRules } from '../../func';
import { IBmiData } from '../darw.interface';
import { bmiData1, bmiData2, bmiData3, bmiData4, judgeAreas, setHorRules, setVerRules } from './data';
import DrawBase from './DrawBase';

const fontColor = '#131415';
const lineColor = '#B1E3E6';



interface IData {
    bmiNum: number;
    bmiTz: number;


    bmiList: {
        week: number;
        weight: number;
        x: number;
        y: number;

    }[];
}





function converRemoteData(raw: IBmiData): IData {
    const bmiTz = +raw.weight
    const bmiNum = +raw.preBmi
    const bmiList = raw.items || []
    return {
        bmiNum,
        bmiTz,
        bmiList: bmiList
            .map(item => {
                const newItem = { weight: 0, week: -1 }
                if (!item.weight || !item.week) {
                    return { ...newItem, x: newItem.week, y: newItem.weight }
                } else {
                    newItem.weight = +item.weight - bmiTz;
                    if (item.week.indexOf('+') !== -1) {
                        const arr = item.week.split('+');
                        newItem.week = +arr[0] + +arr[1] / 7;
                    }
                    newItem.week--;
                }



                return { ...newItem, x: newItem.week, y: newItem.weight }
            })
            .filter((i) => i.week >= 0 && i.week <= 39 && i.weight >= -8 && i.weight <= 24)

    }
}

export default class DrawBmi extends DrawBase {

    bmiNum = ''
    bmiTz = ''
    bmiList: { week: string, weight: string }[] = []

    data!: IData



    state = { ...bmiData2 }
    constructor() {
        super()
    }





    init(rawData: IBmiData) {
        const a = rawData || { preBmi: '0', weight: '0', items: [] }
        this.data = converRemoteData(a)
        console.log('drawBmi', a, this.data)

        const data = this.data
        const preBmi = data.bmiNum
        if (preBmi < 18.5) {

            this.state = bmiData1

        } else if (preBmi < 25) {
            this.state = bmiData2

        } else if (preBmi < 30) {
            this.state = bmiData3

        } else if (preBmi >= 30) {
            this.state = bmiData4

        }


        this.drawBmiCanvas();
        return this
    };



    //绘制曲线
    drawScaleLine(
        ctx: any,
        oringin: any[],
        steps: any[],
        data: any,
        point: any[],
        color: string,
        shape: any[],
        lineWidth: number,
    ) {
        for (let i = 0; i < data.length; i++) {
            //绘制曲线
            ctx.beginPath();
            ctx.setLineDash(shape);
            ctx.lineWidth = lineWidth;
            if (i < data.length - 1) {
                ctx.moveTo(oringin[0] + steps[0] * data[i].x, oringin[1] - steps[1] * data[i].y);
                ctx.lineTo(oringin[0] + steps[0] * data[i + 1].x, oringin[1] - steps[1] * data[i + 1].y);
            }
            ctx.strokeStyle = color;
            ctx.stroke();
            //绘制红点
            if (point[0]) {
                ctx.beginPath();
                ctx.setLineDash([]);
                ctx.arc(oringin[0] + steps[0] * data[i].x, oringin[1] - steps[1] * data[i].y, 3, 0, 2 * Math.PI);
                ctx.fillStyle = point[1];
                ctx.fill();
            }
        }
    }

    //绘制x轴线
    setVertical = (
        context: any,
        xCount: number,
        yCount: number,
        xStep: number,
        yStep: number,
        baseLeft: number,
        baseTop: number,
    ) => {
        context.strokeStyle = lineColor;
        for (let i = 0; i < xCount; i++) {
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(baseLeft, baseTop + xStep * i);
            context.lineTo(baseLeft + (yCount - 1) * yStep, baseTop + xStep * i);
            context.textBaseline = 'middle';
            context.fillStyle = fontColor;
            context.font = 'bold 12px consolas';
            context.fillText(i * 2 + -8, baseLeft - 20, (xCount - 1) * xStep + baseTop - i * xStep);
            context.stroke();
        }
        context.font = 'bold 12px normal';
        context.fillText('体重增长(kg)', baseLeft - 20, baseTop - 20);
    };

    //绘制y轴线
    setHorizontal = (
        context: any,
        xCount: number,
        yCount: number,
        xStep: number,
        yStep: number,
        baseLeft: number,
        baseTop: number,
    ) => {
        let count = 0;
        for (let i = 0; i < yCount; i++) {
            count++;
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(yStep * i + baseLeft, baseTop);
            context.lineTo(yStep * i + baseLeft, baseTop + xStep * (xCount - 1));
            context.textAlign = 'center';
            context.fillStyle = fontColor;
            context.font = 'bold 12px consolas';
            if (count === 1 || count === 4) {
                count = count === 4 ? 1 : count;
                context.fillText(i + 1, baseLeft + i * yStep, xStep * xCount + baseTop - 15);
            }
            context.stroke();
        }
        context.font = 'bold 12px normal';
        context.fillText('孕周(周)', yStep * yCount + baseLeft + 15, (xCount - 1) * xStep + baseTop);
    };

    drawBmiCanvas() {
        const { data, state, canvas } = this
        const { bmiBottomLine, bmiTopLine, bmiLinesPoints, bmiIntro } = state;
        const { bmiNum, bmiList } = data
        let newBmiList = [...bmiList];



        const unusualColor =
            newBmiList.length > 0 && judgeAreas(newBmiList[newBmiList.length - 1], bmiLinesPoints) ? fontColor : '#FF0909';

        const context = canvas.getContext('2d');
        canvas.width = 700;
        canvas.height = 650;

        const baseLeft = 60;
        const baseTop = 150;
        const xStep = 30;
        const yStep = 15;
        const xCount = 17;
        const yCount = 40;

        context.fillStyle = fontColor;
        context.font = 'bold 16px normal';
        context.textAlign = 'center';
        context.fillText('BMI孕期体重管理曲线', canvas.width / 2, baseTop - 80);

        context.fillStyle = '#52aaff';
        context.font = 'normal 12px normal';
        context.fillText(`孕前BMI: ${bmiNum} kg/㎡`, canvas.width / 2, baseTop - 50);
        context.fillText(bmiIntro, canvas.width / 2, baseTop - 30);
        context.fillStyle = fontColor;

        this.setVertical(context, xCount, yCount, xStep, yStep, baseLeft, baseTop);
        this.setHorizontal(context, xCount, yCount, xStep, yStep, baseLeft, baseTop);
        setVerRules(context, [baseLeft, baseTop + (xCount - 1) * xStep], (yCount - 1) * yStep, lineColor, 1, yStep, 5);
        setHorRules(context, [baseLeft, baseTop + (xCount - 1) * xStep], (xCount - 1) * xStep, lineColor, 1, xStep, 5);

        const endLineArr = [bmiBottomLine, bmiTopLine];
        endLineArr.forEach((line) => {
            this.drawScaleLine(
                context,
                [baseLeft, baseTop + (xCount - 5) * xStep],
                [yStep, xStep / 2],
                line,
                [true, '#787878'],
                '#787878',
                [8],
                2,
            );
        });

        // console.log(newBmiList, 'bmi2');
        this.drawScaleLine(
            context,
            [baseLeft, baseTop + (xCount - 5) * xStep],
            [yStep, xStep / 2],
            newBmiList,
            [true, unusualColor],
            unusualColor,
            [0],
            2,
        );
    }


}
