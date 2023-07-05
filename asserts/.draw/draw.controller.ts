import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from 'src/core/config/config.service';
import { AppConfig, } from 'src/utils/AppConfig';
import { IBmiData, IFetusData, IFetusNichdData, IPregnogramData } from './darw.interface';
import { DrawService } from './draw.service';

@Controller('draw')
export class DrawController {
  constructor(private readonly drawService: DrawService, private readonly c: ConfigService) { }

  @Get()
  h() {
    return AppConfig.get('prefix') + "??"
  }

  @Post('bmi')
  drawBmi(@Body() data: IBmiData) {
    return this.drawService.drawBmi(data);
  }

  @Post('fetus')
  drawFetus(@Body() data: IFetusData) {
    return this.drawService.drawFetus(data);
  }

  @Post('fetusNichd')
  drawFetusNichd(@Body() data: IFetusNichdData) {
    return this.drawService.drawFetusNichd(data);
  }

  @Post('pregnogram')
  drawPregnogram(@Body() data: IPregnogramData) {
    return this.drawService.drawPregnogram(data);
  }



}
