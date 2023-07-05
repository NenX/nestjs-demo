import { Canvas, createCanvas } from 'canvas';
import { IDrawWorker } from '../darw.interface';



export default class DrawBase implements IDrawWorker {
    canvas: Canvas

    constructor() {
        this.canvas = createCanvas(100, 100)
    }
    toDataURL() {
        return { dataUrl: this.canvas.toDataURL() }
    }
    init(_data: any) { return this }



}