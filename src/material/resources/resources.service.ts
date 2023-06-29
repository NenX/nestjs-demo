import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationOptionsInterface } from 'src/common/paginate';

@Injectable()
export class ResourcesService {

  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,

  ) { }

  create(createResourceDto: CreateResourceDto) {
    const pregnancy = new Resource();
    // pregnancy.name = createPregnancyDto.name
    // pregnancy.age = createPregnancyDto.age
    // pregnancy.gestationalWeek = createPregnancyDto.gestationalWeek
    // pregnancy.gravidity = createPregnancyDto.gravidity
    // pregnancy.parity = createPregnancyDto.parity
    Object.assign(pregnancy, createResourceDto)
    return this.resourceRepository.save(pregnancy)

  }

  findAll() {
    return this.resourceRepository.find()

  }
  count(page: number, size: number) {
    const skip = page * size
    return this.resourceRepository.count({ take: size, skip })

  }

  findOne(id: number) {
    return this.resourceRepository.findOneBy({ id })

  }

  update(updateResourceDto: UpdateResourceDto) {
    const pregnancy = new Resource();
    // pregnancy.name = createPregnancyDto.name
    // pregnancy.age = createPregnancyDto.age
    // pregnancy.gestationalWeek = createPregnancyDto.gestationalWeek
    // pregnancy.gravidity = createPregnancyDto.gravidity
    // pregnancy.parity = createPregnancyDto.parity
    Object.assign(pregnancy, updateResourceDto)
    const id = updateResourceDto.id
    return this.resourceRepository.update(id, pregnancy)
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }
}
