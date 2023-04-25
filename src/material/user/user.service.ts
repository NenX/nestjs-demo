import { Injectable, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/common/paginate';
import { PaginationOptionsInterface } from 'src/common/paginate/pagination.options.interface';
import { HttpExceptionFilter } from 'src/core/interceptors/http-exception.filter';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) { }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
  findOneByLoginName(loginName: string) {
    return this.usersRepository.findOneBy({ loginName });
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }

  create(createUserDto: CreateUserDto) {




    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }
  update(id: number, createUserDto: UpdateUserDto) {
    const user = new User();
    user.id = id;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.update(id, user);
  }
  async paginate(options: PaginationOptionsInterface,) {
    console.log('options', options)
    const [result, total] = await this.usersRepository.findAndCount({
      take: options.limit,
      skip: options.page, // think this needs to be page * limit
    });

    // TODO add more tests for paginate

    return new Pagination<User>({
      result,
      total,
    });
  }
}