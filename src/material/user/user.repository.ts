import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { EntityRepository, Repository } from 'typeorm';
  import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
  
  @EntityRepository(User)
  export class UsersRepository extends Repository<User> {
    async createUser(authCredentialsDto: CreateUserDto): Promise<void> {
      const { loginName, password } = authCredentialsDto;
  
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = this.create({ loginName, password: hashedPassword });
      try {
        await this.save(user);
      } catch (error) {
        if (error.code === '23505') {
          // duplicate username
          throw new ConflictException('Username already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
  }