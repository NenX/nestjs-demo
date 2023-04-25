import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/core/interceptors/http-exception.filter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService,],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule { }


