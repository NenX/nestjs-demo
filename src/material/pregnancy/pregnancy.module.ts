import { Module } from '@nestjs/common';
import { PregnancyService } from './pregnancy.service';
import { PregnancyController } from './pregnancy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregnancy } from './entities/pregnancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pregnancy])],

  controllers: [PregnancyController],
  providers: [PregnancyService],
  exports: [PregnancyService]
})
export class PregnancyModule { }
