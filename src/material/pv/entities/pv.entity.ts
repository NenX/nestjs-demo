import { Pregnancy } from "src/material/pregnancy/entities/pregnancy.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Exam } from "../../exam/entities/exam.entity";

@Entity()
export class Pv {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    visitTime: string;

    @Column({ type: 'text' })
    save: string;

    @OneToOne(() => Exam)
    @JoinColumn()
    exam: Exam;

    @ManyToOne(() => Pregnancy,)
    pregnancy: Pregnancy;
}