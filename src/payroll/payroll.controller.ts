import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dtos/create-payroll.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Payroll } from './payroll.entity';
import { Repository } from 'typeorm';

interface PayrollResult {
  "employeeId": number,
  "name": string,
  "position": string,
  "salary": number,
  "bonus": number,
  "deductions": number,
  "benefits": number,
  "netSalary": number,
}

@Controller('payroll')
export class PayrollController {
    constructor (
       @InjectRepository(Payroll) 
       private readonly payrollRepository: Repository<Payroll>,
       private payrollService: PayrollService
    ){}

  

    @Post('calculate')
    async calculatePayroll(@Body() body: CreatePayrollDto): Promise<any>{
        const payrollEntities = await this.payrollRepository.find();

        if(!body.employeeId){
            throw new BadRequestException('Employee ID is required');
        }

        try {

            const updatedPayroll = await this.payrollService.calculateNetSalary(body);

            return updatedPayroll;

        }catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Failed to calculate the payroll')
        }
    }

    @Post('generate-payslip')
    async generatePaySlip(@Body() body: CreatePayrollDto){

        const paySlip = this.payrollService.generatePaySlip(body);

        return paySlip;
        

    }
}