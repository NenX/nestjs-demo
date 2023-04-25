import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { PvService } from './pv.service';
import { CreatePvDto } from './dto/create-pv.dto';
import { UpdatePvDto } from './dto/update-pv.dto';

@Controller('pv')
export class PvController {
  constructor(private readonly pvService: PvService) {}

  @Post()
  create(@Body() createPvDto: CreatePvDto) {
    return this.pvService.create(createPvDto);
  }
  @Get('page')
  async index(@Request() request) {
    // TODO make PaginationOptionsInterface an object so it can be defaulted
    return await this.pvService.paginate({
      limit: request.query.limit ?? 10,
      page: request.query.page ?? 0,
    },request.query.save);
  }
  @Get()
  findAll() {
    return this.pvService.findAll();
  }
  @Get("test")
  test() {
    return this.pvService.test();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pvService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePvDto: UpdatePvDto) {
    return this.pvService.update(+id, updatePvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pvService.remove(+id);
  }
}
