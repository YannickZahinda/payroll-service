import { IsString, IsNumber } from "class-validator";

export class CreatePayrollDto {
    @IsNumber()
    employeeId: number;
    
    @IsString()
    name: string;

    @IsString()
    position: string;

    @IsNumber()
    salary: number;

    @IsNumber()
    bonus: number;

    @IsNumber()
    deductions: number;

    @IsNumber()
    benefits: string;
}