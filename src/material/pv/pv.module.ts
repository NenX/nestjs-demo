import { Module } from '@nestjs/common';
import { PvService } from './pv.service';
import { PvController } from './pv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pv } from './entities/pv.entity';
import { Exam } from '../exam/entities/exam.entity';
import { Pregnancy } from '../pregnancy/entities/pregnancy.entity';
import { PregnancyService } from '../pregnancy/pregnancy.service';
import { PregnancyModule } from '../pregnancy/pregnancy.module';
import { ExamModule } from '../exam/exam.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pv, Exam,]),PregnancyModule,ExamModule ],

  controllers: [PvController],
  providers: [PvService]
})
export class PvModule { }
