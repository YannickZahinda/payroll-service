import { Body, Controller, Post } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dtos/create-payroll.dto';

@Controller('payroll')
export class PayrollController {
    constructor (
       private payrollService: PayrollService
    ){}

    @Post('calculate')
    async calculatePayroll(@Body() body: CreatePayrollDto){
        const payrollRecord = await this.payrollService.calculateNetSalary(body);

        return payrollRecord;
    }

    @Post('generate-payslip')
    async generatePaySlip(@Body() body: CreatePayrollDto){

        const paySlip = this.payrollService.generatePaySlip(body);

        return paySlip;
        

    }
}