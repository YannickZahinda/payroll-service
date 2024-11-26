import { Body, Controller, Post } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dtos/create-payroll.dto';

@Controller('payroll')
export class PayrollController {
    constructor (
       private payrollService: PayrollService
    ){}

    @Post('calculate')
    calculatePayroll(@Body() body: CreatePayrollDto){
        const { salary, bonus, deductions } = body;
        const netSalary = this.payrollService.calculateNetSalary(salary, bonus, deductions);

        return {netSalary}
    }

    @Post('payslip')
    generatePaySlip(@Body() body: CreatePayrollDto){
        const {employeeId, salary, bonus, deductions} = body;
        const netSalary = this.payrollService.calculateNetSalary(salary, bonus, deductions);
        const payslip = this.payrollService.generatePaySlip({id: employeeId, name: 'Employee'}, netSalary)

        return {payslip};

    }
}