import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payroll } from './payroll.entity';
import { CreatePayrollDto } from './dtos/create-payroll.dto';

@Injectable()
export class PayrollService {
    constructor(@InjectRepository(Payroll) private repo: Repository<Payroll>){}

    // calculateNetSalary(salary: number, bonus?: number, deductions?: number):number{
    //     salary = salary || 0;
    //     bonus = bonus || 0;
    //     deductions = deductions || 0;

    //     const netSalary = this.repo.create()

    //     return salary + bonus - deductions;

    // }

    calculateNetSalary(payrollDto: CreatePayrollDto) {
        const globalSalary = this.repo.create(payrollDto);
        const netSalary = globalSalary.salary + (globalSalary.bonus || 0) - (globalSalary.deductions || 0);

        globalSalary.netSalary = netSalary;


        return this.repo.save(globalSalary)
    }

    generatePaySlip(employee: {name: string; id: number}, netSalary: number):string {

        if (!employee || !employee.name || typeof netSalary !== 'number'){
            throw new Error('Invalid employee details or net salary.');
        }
        
        return `Payslip for ${employee.name}: \nNet Salary: $${netSalary}`;
    }
}
