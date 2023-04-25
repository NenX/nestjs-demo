import { PartialType } from '@nestjs/mapped-types';
import { CreatePregnancyDto } from './create-pregnancy.dto';

export class UpdatePregnancyDto extends PartialType(CreatePregnancyDto) {}
