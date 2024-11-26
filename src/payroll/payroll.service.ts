import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payroll } from './payroll.entity';

@Injectable()
export class PayrollService {
    constructor(@InjectRepository(Payroll) private repo: Repository<Payroll>){}

    calculateNetSalary(salary: number, bonus: number, deductions: number){
        return salary + (bonus || 0) - (deductions || 0);

    }

    generatePaySlip(employee: any, netSalary: number):string {
        return `Payslip for ${employee.name}: \nNet Salary: $${netSalary}`;
    }
}
