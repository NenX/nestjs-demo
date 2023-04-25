import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePregnancyDto } from './dto/create-pregnancy.dto';
import { UpdatePregnancyDto } from './dto/update-pregnancy.dto';
import { Pregnancy } from './entities/pregnancy.entity';

@Injectable()
export class PregnancyService {

  constructor(

    @InjectRepository(Pregnancy)
    private pregnancyRepository: Repository<Pregnancy>,
  ) { }

  create(createPregnancyDto: CreatePregnancyDto) {


    const pregnancy = new Pregnancy();
    // pregnancy.name = createPregnancyDto.name
    // pregnancy.age = createPregnancyDto.age
    // pregnancy.gestationalWeek = createPregnancyDto.gestationalWeek
    // pregnancy.gravidity = createPregnancyDto.gravidity
    // pregnancy.parity = createPregnancyDto.parity
    Object.assign(pregnancy,createPregnancyDto)
    return this.pregnancyRepository.save(pregnancy)


  }

  findAll() {
    return `This action returns all pregnancy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pregnancy`;
  }

  update(id: number, updatePregnancyDto: UpdatePregnancyDto) {
    return `This action updates a #${id} pregnancy`;
  }

  remove(id: number) {
    return `This action removes a #${id} pregnancy`;
  }
}
