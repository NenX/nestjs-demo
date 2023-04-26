import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/core/interceptors/http-exception.filter';
import { Pagination } from 'src/common/paginate';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/core/auth/auth.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private configService: ConfigService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const users =  await this.userService.findAll();
    return {users,test:this.configService.get('sb')}
  }
  
  @UseGuards(AuthGuard)
  @Get('page')
  async index(@Request() request) {
    // TODO make PaginationOptionsInterface an object so it can be defaulted
    return await this.userService.paginate({
      limit: request.query.limit ?? 10,
      page: request.query.page ?? 0,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
