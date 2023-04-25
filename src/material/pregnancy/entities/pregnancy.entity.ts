
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pregnancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gravidity: number;

  @Column()
  parity: number;

  @Column()
  gestationalWeek: string;

  @Column()
  age: number;

  @Column()
  inpatient_no: string;


}