import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';

import { Request as R } from 'express';
import QRCode from 'qrcode';
import { AppConfig } from './utils/AppConfig';
const m = new Map<string, boolean>()
class H { 'aa': number }
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/ca/signinfo')
  signinfo(@Body() xx: { bizSn: string }) {
    const key = xx.bizSn
    const isIn = m.has(key)
    if (!isIn) return { ret: '1' }
    const data = m.get(key)
    if (data) {

      m.delete(key)
    }
    return { ret: data ? '1' : '0', data };
  }
  @Post('/ca/signreq')
  signreq(@Body() xx: { note: string }, @Request() req: R) {
    const key = Buffer.from(xx.note).toString('base64')
    m.set(key, false)
    console.log('baseUrl:', req.baseUrl,)
    console.log('req:', req.hostname,)
    return new Promise((res, rej) => {
      const data = QRCode.toString(`http://${req.headers.host}/${AppConfig.get('prefix')}/ca/sign/${key}`, { type: 'svg' }, function (err, url) {
        console.log(req.originalUrl)
        const imgData = `data:image/svg+xml;base64, ${Buffer.from(url).toString('base64')}`
        res({ sn: key, img: imgData, })
      })
    })
  }



  @Get('/ca/sign/:id')
  sign(@Param('id') id: string,) {
    m.set(id, true)
    return 2222222222;
  }
}
