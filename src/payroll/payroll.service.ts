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

    calculateNetSalary(payrollDto: CreatePayrollDto){
        const globalSalary = this.repo.create(payrollDto);
        const netSalary = globalSalary.salary + (globalSalary.bonus || 0) - (globalSalary.deductions || 0);

        globalSalary.netSalary = netSalary;


        return this.repo.save(globalSalary)
    }

    async generatePaySlip(payrollDto: CreatePayrollDto): Promise<string>  {

        const paySlip = this.repo.create(payrollDto);

        const netSalary = paySlip.salary + (paySlip.bonus || 0) - (paySlip.deductions || 0);

        paySlip.netSalary = netSalary;


        await this.repo.save(paySlip);

        
        return `Payslip for ${paySlip.name}: \nPosition: ${paySlip.position} \nSalary: $${paySlip.salary} \nBonus: $${paySlip.bonus } \nDeductions: $${paySlip.deductions || 0} \nFriendly Net Salary :) $${netSalary}`;
    }
}
