import { Injectable, Post } from '@nestjs/common';
import { IBmiData, IFetusData, IFetusNichdData, IPregnogramData } from './darw.interface';
import { DrawBmi, DrawFetus, DrawFetusNichd, DrawPregnogram } from './draw-helper';

@Injectable()
export class DrawService {

  drawBmi(data: IBmiData) {
    const d = new DrawBmi().init(data);
    return d.toDataURL()
  }
  drawFetus(data: IFetusData) {
    const d = new DrawFetus().init(data);
    return d.toDataURL()
  }
  drawFetusNichd(data: IFetusNichdData) {
    const d = new DrawFetusNichd().init(data);
    return d.toDataURL()
  }
  drawPregnogram(data: IPregnogramData) {
    const d = new DrawPregnogram().init(data);
    return d.toDataURL()
  }


}
