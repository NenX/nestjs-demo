import { Module } from '@nestjs/common';
import { DrawService } from './draw.service';
import { DrawController } from './draw.controller';

@Module({
  // controllers: [DrawController],
  // providers: [DrawService]
})
export class DrawModule {}
