import { CreateExamDto } from "src/material/exam/dto/create-exam.dto";
import { CreatePregnancyDto } from "src/material/pregnancy/dto/create-pregnancy.dto";

export class CreatePvDto {
    visitTime: string;
    exam: CreateExamDto & { id?: number };
    pregnancy: CreatePregnancyDto & { id?: number };
}
