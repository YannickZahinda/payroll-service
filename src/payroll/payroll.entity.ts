import { Exclude } from "class-transformer";
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
    benefits: number;

    @Exclude()
    @Column('decimal', {nullable: true})
    netSalary: number;

    @AfterInsert()
    logInsert(){
        console.log('Inserted employee with id', this.employeeId);
        
    }
}