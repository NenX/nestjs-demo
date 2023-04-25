import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationOptionsInterface } from 'src/common/paginate';
import { FindOperator, Repository } from 'typeorm';
import { Exam } from '../exam/entities/exam.entity';
import { ExamService } from '../exam/exam.service';
import { Pregnancy } from '../pregnancy/entities/pregnancy.entity';
import { PregnancyService } from '../pregnancy/pregnancy.service';
import { CreatePvDto } from './dto/create-pv.dto';
import { UpdatePvDto } from './dto/update-pv.dto';
import { Pv } from './entities/pv.entity';

@Injectable()
export class PvService {
  constructor(
    @InjectRepository(Pv)
    private pvRepository: Repository<Pv>,
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    private pregnancyService: PregnancyService,
    private examService: ExamService,
  ) { }

  findAll() {
    return this.pvRepository.find({ relations: ['exam', 'pregnancy'] });
  }

  findOne(id: number) {
    return this.pvRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.pvRepository.delete(id);
  }

  async create(createUserDto: CreatePvDto) {
    const pv = new Pv();


    const exam = new Exam();
    exam.fetalnum = createUserDto.exam.fetalnum
    exam.note = createUserDto.exam.note
    await this.examRepository.save(exam)
    pv.exam = exam


    const pregnancy = await this.pregnancyService.create(createUserDto.pregnancy);

    pv.pregnancy = pregnancy

    await this.examRepository.save(exam)
    pv.exam = exam


    pv.visitTime = createUserDto.visitTime;

    return this.pvRepository.save(pv);
  }
  async update(id: number, createUserDto: UpdatePvDto) {
    const pv = new Pv();
    Object.assign(pv, createUserDto)
    if (createUserDto.exam?.id) {
      await this.examService.update(createUserDto.exam?.id, createUserDto.exam)

    }

    return this.pvRepository.update(id, pv);
  }
  async paginate(options: PaginationOptionsInterface, save?: string) {
    console.log('options', options)
    const [result, total] = await this.pvRepository.findAndCount({
      relations: ['exam', 'pregnancy'],
      take: options.limit,
      skip: options.page * options.limit, // think this needs to be page * limit
      where: save ? {
        // 'save': save ? new FindOperator("not", "") : undefined
        'save': (save === "0" ? new FindOperator("equal", " ") : new FindOperator("not", ""))

      } : undefined

    });

    // TODO add more tests for paginate

    return new Pagination<Pv>({
      result,
      total,
    });
  }

  test2() {
    const db = this.pvRepository.createQueryBuilder("pv")
    const res = db
      .leftJoinAndMapOne("pv.exam22", "pv.exam", "exam",)
      .leftJoinAndMapOne("pv.xx", "pv.pregnancy", "????????",)

      .where(qb => {
        // (SELECT ee.save from exam as ee where ee.id = p1.examId) <> ""

        const subQuery = qb
          .subQuery()
          .select("ee.save")
          .from(Exam, "ee")
          .where("ee.id = pv.examId")
          .getQuery();
        return `(${subQuery}) <> ''`;
      })
      .getMany();
    return res

  }
  test() {
    const db = this.pvRepository.createQueryBuilder("pv")
    const res = db
      .leftJoinAndMapOne("pv.exam22", "pv.exam", "ee",)
      .leftJoinAndMapOne("pv.xx", "pv.pregnancy", "????????",)

      .where("ee.save = ''")
      .getMany();
    return res

  }
}
