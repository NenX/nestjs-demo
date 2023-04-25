import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { readFile } from 'fs'
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import { Repository } from 'typeorm';

const arr = []
readFile('asserts/w1.jpg', (err, data) => {
  if (!err) {
    arr[0] = `data:image/png;base64,${data.toString('base64')}`
  }
})
readFile('asserts/w2.jpg', (err, data) => {
  if (!err) {
    arr[1] = `data:image/png;base64,${data.toString('base64')}`
  }
})

let pdf 
readFile('asserts/tcp.pdf', (err, data) => {
  if (!err) {
    pdf = `${data.toString('base64')}`
  }
})

@Injectable()
export class ExamService {

  constructor(

    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) { }

  create(createExamDto: CreateExamDto) {
    return 'This action adds a new exam';
  }

  findAll() {
    return `This action returns all exam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exam`;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return this.examRepository.update(id, updateExamDto)
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
  async getImg(id: number) {
    return arr
  }
  async getpdf(id: number) {
    return {pdfdata:pdf}
  }
}
