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
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) { }

  findAll() {
    return this.usersRepository.find({relations:{roles:true}});
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

  async create(createUserDto: CreateUserDto) {

    const { loginName, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({ ...createUserDto, loginName, password: hashedPassword });

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }


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