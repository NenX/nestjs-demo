import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PregnancyService } from './pregnancy.service';
import { CreatePregnancyDto } from './dto/create-pregnancy.dto';
import { UpdatePregnancyDto } from './dto/update-pregnancy.dto';

@Controller('pregnancy')
export class PregnancyController {
  constructor(private readonly pregnancyService: PregnancyService) {}

  @Post()
  create(@Body() createPregnancyDto: CreatePregnancyDto) {
    return this.pregnancyService.create(createPregnancyDto);
  }

  @Get()
  findAll() {
    return this.pregnancyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pregnancyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePregnancyDto: UpdatePregnancyDto) {
    return this.pregnancyService.update(+id, updatePregnancyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pregnancyService.remove(+id);
  }
}
