import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payroll } from './payroll.entity';

@Injectable()
export class PayrollService {
    constructor(@InjectRepository(Payroll) private repo: Repository<Payroll>){}

    calculateNetSalary(salary: number, bonus?: number, deductions?: number):number{
        salary = salary || 0;
        bonus = bonus || 0;
        deductions = deductions || 0;

        return salary + bonus - deductions;

    }

    generatePaySlip(employee: {name: string; id: number}, netSalary: number):string {

        if (!employee || !employee.name || typeof netSalary !== 'number'){
            throw new Error('Invalid employee details or net salary.');
        }
        
        return `Payslip for ${employee.name}: \nNet Salary: $${netSalary}`;
    }
}
