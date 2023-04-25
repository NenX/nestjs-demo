import { IFetusData } from '../darw.interface';
import { acData, bpdData, flData, judgeAreas, setHorRules, setVerRules } from './data';
import DrawBase from './DrawBase';

const fetusColorList = ['#000', '#E09E78', '#8878E0', '#D9D9F3', '#D9D9F3', '#6BB6FF'];
const fontColor = '#131415';
const lineColor = '#B1E3E6';
export type IFuckFetusData = { x: number, y: number, value?: number, gestationalWeek?: string, sort?: string }

export default class DrawFetus extends DrawBase {
    pointData = null

    midNiptUltrasounds: IFetusData['mlUltrasounds'] = []
    mlUltrasounds: IFetusData['mlUltrasounds'] = []
    init(data: IFetusData) {
        const mlUltrasounds = data?.mlUltrasounds || []

        this.mlUltrasounds = [...mlUltrasounds]
        this.midNiptUltrasounds = [...mlUltrasounds]
        this.drawFetusCanvas();
        return this
    }

    toDataURL() {
        return { dataUrl: this.canvas.toDataURL() }
    }

    //绘制曲线
    drawScaleLine(
        ctx: any,
        oringin: any[],
        steps: any[],
        data: IFuckFetusData[],
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
            context.font = 'bold 12px normal';
            if ((i * 2) % 10 === 0) {
                context.lineWidth = 1;
                context.fillText(i * 2, baseLeft - 20, (xCount - 1) * xStep + baseTop - i * xStep);
            }
            context.stroke();
        }
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
        for (let i = 0; i < yCount; i++) {
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(yStep * i + baseLeft, baseTop);
            context.lineTo(yStep * i + baseLeft, baseTop + xStep * (xCount - 1));
            context.textAlign = 'center';
            context.fillStyle = fontColor;
            context.font = 'bold 12px normal';
            if (i % 5 === 0) {
                context.lineWidth = 1;
                context.fillText(i + 10, baseLeft + i * yStep, xStep * xCount + baseTop + 5);
            }
            context.stroke();
        }
    };

    drawFetusCanvas = () => {
        const midNiptUltrasounds = this.midNiptUltrasounds || [];

        let allBpdArr: IFuckFetusData[][] = [];
        let allFlArr: IFuckFetusData[][] = [];
        let allAcArr: IFuckFetusData[][] = [];
        if (midNiptUltrasounds.length > 0) {
            midNiptUltrasounds.forEach((item) => {
                let gestationalWeek = item.gestationalWeek;
                let yunWeek = +gestationalWeek;
                if (gestationalWeek && gestationalWeek.indexOf('+') !== -1) {
                    const arr = gestationalWeek.split('+');
                    yunWeek = Number(arr[0]) + Number(arr[1]) / 7;
                }
                const setData = (param: 'bpd' | 'fl' | 'ac', arr: IFuckFetusData[][]) => {
                    const obj: IFuckFetusData = { x: 0, y: 0, value: 0, gestationalWeek: '', sort: '' };
                    const sort = +item.fetal - 1;
                    obj.x = yunWeek - 10;
                    if (param === 'ac') {
                        obj.y = Number(item[param]) / 10;
                    } else {
                        obj.y = Number(item[param]);
                    }
                    obj.value = Number(item[param]);
                    obj.gestationalWeek = item.gestationalWeek;
                    obj.sort = item.fetal;
                    if (yunWeek && item[param] && yunWeek >= 10 && yunWeek <= 40 && obj.y <= 110) {
                        const arrItem = arr[sort] || [];
                        arrItem.push(obj);
                        arr[sort] = arrItem
                    }
                };

                setData('bpd', allBpdArr);
                setData('fl', allFlArr);
                setData('ac', allAcArr);
            });
        }

        const canvas = this.canvas
        const context = canvas.getContext('2d');
        canvas.width = 550;
        canvas.height = 650;

        const baseLeft = 50;
        const baseTop = 80;
        const xStep = 10;
        const yStep = 15;
        const xCount = 56;
        const yCount = 31;

        context.fillStyle = fontColor;
        context.font = 'bold 16px normal';
        context.textAlign = 'center';
        context.fillText('胎儿生长曲线', canvas.width / 2, baseTop - 25);

        this.setVertical(context, xCount, yCount, xStep, yStep, baseLeft, baseTop);
        this.setHorizontal(context, xCount, yCount, xStep, yStep, baseLeft, baseTop);
        setVerRules(context, [baseLeft, baseTop + (xCount - 1) * xStep], (yCount - 1) * yStep, lineColor, 1, yStep, 5);
        setHorRules(context, [baseLeft, baseTop + (xCount - 1) * xStep], (xCount - 1) * xStep, lineColor, 1, xStep, 5);

        //手动绘制标尺最右端点
        //BPD
        context.fillText('+2SD', baseLeft + yCount * yStep, baseTop + 4.2 * xStep);
        context.fillText('Mean', baseLeft + yCount * yStep, baseTop + 8 * xStep);
        context.fillText('-2SD', baseLeft + yCount * yStep, baseTop + 11.5 * xStep);
        //FL
        context.fillText('+2SD', baseLeft + yCount * yStep, baseTop + 16.5 * xStep);
        context.fillText('Mean', baseLeft + yCount * yStep, baseTop + 19 * xStep);
        context.fillText('-2SD', baseLeft + yCount * yStep, baseTop + 21.5 * xStep);
        //AC
        context.fillText('37', baseLeft + yCount * yStep, baseTop + 36.5 * xStep);
        context.fillText('34', baseLeft + yCount * yStep, baseTop + 38 * xStep);
        context.fillText('31', baseLeft + yCount * yStep, baseTop + 39.5 * xStep);

        context.font = 'bold 18px normal';
        context.textAlign = 'center';
        context.fillText('BPD', baseLeft + (yCount - 6) * yStep, baseTop + 6 * xStep);
        context.fillText('FL', baseLeft + (yCount - 6) * yStep, baseTop + 28 * xStep);
        context.fillText('AC', baseLeft + (yCount - 6) * yStep, baseTop + 44 * xStep);

        const middleLineArr = [bpdData.middleLine, flData.middleLine, acData.middleLine];
        const endLineArr = [
            bpdData.bottomLine,
            bpdData.topLine,
            flData.bottomLine,
            flData.topLine,
            acData.bottomLine,
            acData.topLine,
        ];


        const drawItemLine = (itemArr: IFuckFetusData[][], itemData: typeof bpdData, itemName: string) => {
            itemArr.forEach((item, index) => {
                if (item.length > 0) {
                    const color = judgeAreas(item[item.length - 1], itemData.lineArea) ? fetusColorList[index] : '#FF0909';
                    this.drawScaleLine(
                        context,
                        [baseLeft, baseTop + (xCount - 1) * xStep],
                        [yStep, xStep / 2],
                        item,
                        [true, color, itemName],
                        color,
                        [0],
                        4,
                    );
                }
            });
        };
        drawItemLine(allBpdArr, bpdData, 'BPD');
        drawItemLine(allFlArr, flData, 'FL');
        drawItemLine(allAcArr, acData, 'AC');

        middleLineArr.forEach((line) => {
            this.drawScaleLine(
                context,
                [baseLeft, baseTop + (xCount - 1) * xStep],
                [yStep, xStep / 2],
                line,
                [false],
                '#787878',
                [0],
                2,
            );
        });

        endLineArr.forEach((line) => {
            this.drawScaleLine(
                context,
                [baseLeft, baseTop + (xCount - 1) * xStep],
                [yStep, xStep / 2],
                line,
                [false],
                '#787878',
                [8],
                2,
            );
        });
    };








}

