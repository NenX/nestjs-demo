
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: string;

  @Column()
  ca: string;

  @Column({type:'text'})
  save: string;

  @Column()
  fetalnum: number;
}