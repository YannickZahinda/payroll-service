import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Payroll {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employeeId: number;

    @Column()
    name: string;

    @Column()
    position: string;

    @Column('decimal')
    salary: number;

    @Column('decimal', {nullable: true})
    bonus: number;

    @Column('decimal', {nullable: true})
    deductions: number;

    @Column()
    benefits: string;

    @Exclude()
    @Column('decimal', {nullable: true})
    netSalary: number;
}