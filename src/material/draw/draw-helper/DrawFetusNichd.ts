import { IDrawRequestData, IFetusNichdData, TDrawPoint } from '../darw.interface';
import { fontColor, judgeAreas, lineColor, setHorRules, setVerRules } from './data';
import DrawBase from './DrawBase';
import { IFuckFetusData } from './DrawFetus';
import { acData, bpdData, efwData, flData, hcData, hlData } from './fetusNichdData';
const fetusColorList = ['#000', '#0e318d', '#8878E0', '#D9D9F3', '#D9D9F3', '#6BB6FF']; // #E09E78


export default class fetusNichd extends DrawBase {

    pointData = null

    midNiptUltrasounds: IFetusNichdData['mlUltrasounds'] = []
    mlUltrasounds: IFetusNichdData['mlUltrasounds'] = []
    currentCurve: IFetusNichdData['type'] = 'bpd'


    init(data: IFetusNichdData) {
        const mlUltrasounds = data?.mlUltrasounds || []
        const type = data?.type || 'bpd'

        this.mlUltrasounds = [...mlUltrasounds]
        this.midNiptUltrasounds = [...mlUltrasounds]
        this.currentCurve = type
        this.drawFetusCanvas();
        return this
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
        const { currentCurve } = this;
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
                if (currentCurve === 'efw') {
                    context.fillText(i * 100, baseLeft - 20, (xCount - 1) * xStep + baseTop - i * xStep);
                } else {
                    context.fillText(i * 2, baseLeft - 20, (xCount - 1) * xStep + baseTop - i * xStep);
                }
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
        const { midNiptUltrasounds, currentCurve } = this;

        let allBpdArr: IFuckFetusData[][] = [];
        let allFlArr: IFuckFetusData[][] = [];
        let allAcArr: IFuckFetusData[][] = [];
        let allHlArr: IFuckFetusData[][] = [];
        let allHcArr: IFuckFetusData[][] = [];
        let allEfwArr: IFuckFetusData[][] = [];

        midNiptUltrasounds.forEach((item) => {
            let gestationalWeek = item.gestationalWeek;
            let yunWeek = +item.gestationalWeek;

            if (gestationalWeek && gestationalWeek.indexOf('+') !== -1) {
                const arr = gestationalWeek.split('+');
                yunWeek = Number(arr[0]) + Number(arr[1]) / 7;
            }

            const setData = (param: 'bpd' | 'fl' | 'ac' | 'hl' | 'hc' | 'efw', arr: IFuckFetusData[][]) => {
                const obj: any = {};
                const sort = +item.fetal - 1;
                obj.x = yunWeek - 10;
                if (param === 'ac' || param === 'hc') {
                    obj.y = Number(item[param]) / 10;
                } else if (param === 'efw') {
                    obj.y = Number(item[param]) / 50;
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
            setData('hl', allHlArr);
            setData('hc', allHcArr);
            setData('efw', allEfwArr);
        });

        const canvas = this.canvas;
        const context = canvas.getContext('2d');
        canvas.width = 550;
        canvas.height = 650;

        const baseLeft = 50;
        let baseTop = 80;
        let xStep = 10;
        let xCount = 56;
        const yStep = 15;
        const yCount = 31;
        if (currentCurve === 'bpd') {
            xStep = 10;
            xCount = 56;
        } else if (currentCurve === 'hc') {
            xStep = 15.56;
            xCount = 36;
        } else {
            xStep = 12.17;
            xCount = 46;
        }

        context.fillStyle = fontColor;
        context.font = 'bold 16px normal';
        context.textAlign = 'center';
        context.fillText('胎儿生长曲线', canvas.width / 2, baseTop - 25);

        this.setVertical(context, xCount, yCount, xStep, yStep, baseLeft, baseTop);
        this.setHorizontal(context, xCount, yCount, xStep, yStep, baseLeft, baseTop);
        setVerRules(context, [baseLeft, baseTop + (xCount - 1) * xStep], (yCount - 1) * yStep, lineColor, 1, yStep, 5);
        setHorRules(context, [baseLeft, baseTop + (xCount - 1) * xStep], (xCount - 1) * xStep, lineColor, 1, xStep, 5);

        if (currentCurve === 'bpd') {
            //手动绘制标尺最右端点
            //BPD
            context.fillText('90th', baseLeft + yCount * yStep, baseTop + 6 * xStep);
            context.fillText('50th', baseLeft + yCount * yStep, baseTop + 8.5 * xStep);
            context.fillText('10th', baseLeft + yCount * yStep, baseTop + 11.5 * xStep);
            //FL
            context.fillText('90th', baseLeft + yCount * yStep, baseTop + 16.5 * xStep);
            context.fillText('50th', baseLeft + yCount * yStep, baseTop + 19 * xStep);
            context.fillText('10th', baseLeft + yCount * yStep, baseTop + 21.5 * xStep);
            //AC
            context.fillText('90th', baseLeft + yCount * yStep, baseTop + 36 * xStep);
            context.fillText('50th', baseLeft + yCount * yStep, baseTop + 37.5 * xStep);
            context.fillText('10th', baseLeft + yCount * yStep, baseTop + 39 * xStep);
            context.font = 'bold 18px normal';
            context.textAlign = 'center';
            context.fillText('BPD', baseLeft + (yCount - 6) * yStep, baseTop + 6 * xStep);
            context.fillText('FL', baseLeft + (yCount - 6) * yStep, baseTop + 28 * xStep);
            context.fillText('AC', baseLeft + (yCount - 6) * yStep, baseTop + 44 * xStep);
        } else if (currentCurve === 'hc') {
            //HL
            context.fillText('90th', baseLeft + yCount * yStep, baseTop + 1.5 * xStep);
            context.fillText('50th', baseLeft + yCount * yStep, baseTop + 3.5 * xStep);
            context.fillText('10th', baseLeft + yCount * yStep, baseTop + 6 * xStep);
            //HC
            context.fillText('90th', baseLeft + yCount * yStep, baseTop + 17.5 * xStep);
            context.fillText('50th', baseLeft + yCount * yStep, baseTop + 18.5 * xStep);
            context.fillText('10th', baseLeft + yCount * yStep, baseTop + 19.5 * xStep);
            context.font = 'bold 18px normal';
            context.textAlign = 'center';
            context.fillText('HL', baseLeft + (yCount - 6) * yStep, baseTop + 2 * xStep);
            context.fillText('HC', baseLeft + (yCount - 6) * yStep, baseTop + 22 * xStep);
        } else {
            //EFW
            context.fillText('90th', baseLeft + yCount * yStep, baseTop + 4.5 * xStep);
            context.fillText('50th', baseLeft + yCount * yStep, baseTop + 10.5 * xStep);
            context.fillText('10th', baseLeft + yCount * yStep, baseTop + 16.5 * xStep);
            context.font = 'bold 18px normal';
            context.textAlign = 'center';
            context.fillText('EFW', baseLeft + (yCount - 6) * yStep, baseTop + 6 * xStep);
        }

        let middleLineArr: TDrawPoint[][] = [];
        let endLineArr: any[] = [];
        const drawItemLine = (itemArr: IFuckFetusData[][], itemData: typeof acData, itemName: string) => {
            itemArr.forEach((item: any, index: any) => {
                if (item.length > 0) {
                    const color = judgeAreas(item[item.length - 1], itemData.lineArea)
                        ? fetusColorList[index]
                        : '#FF0909';
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

        if (currentCurve === 'bpd') {
            middleLineArr = [
                bpdData.middleLine,
                flData.middleLine,
                acData.middleLine,
            ];
            endLineArr = [
                bpdData.bottomLine,
                bpdData.topLine,
                flData.bottomLine,
                flData.topLine,
                acData.bottomLine,
                acData.topLine,
            ];
            drawItemLine(allBpdArr, bpdData, 'BPD');
            drawItemLine(allFlArr, flData, 'FL');
            drawItemLine(allAcArr, acData, 'AC');
        } else if (currentCurve === 'hc') {
            middleLineArr = [hcData.middleLine, hlData.middleLine];
            endLineArr = [
                hcData.bottomLine,
                hcData.topLine,
                hlData.bottomLine,
                hlData.topLine,
            ];
            drawItemLine(allHlArr, hlData, 'HL');
            drawItemLine(allHcArr, hcData, 'HC');
        } else {
            middleLineArr = [efwData.middleLine];
            endLineArr = [efwData.bottomLine, efwData.topLine,];
            drawItemLine(allEfwArr, efwData, 'EFW');
        }

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

// const mapDisPathchToProps = { getPregnancyData };

// export default connect(null, mapDisPathchToProps)(Index);
