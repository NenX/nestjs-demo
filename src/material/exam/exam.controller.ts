import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}
  @Get('/img/:id')
  async getImg(id: number) {
    // const a  =await readFile('')
    return this.examService.getImg(id)
  }
  @Post('/pdf/:id')
  async getpdf(id: number) {
    // const a  =await readFile('')
    return this.examService.getpdf(id)
  }
  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    console.log('updateExamDto',updateExamDto)
    return this.examService.update(+id, updateExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(+id);
  }


}
