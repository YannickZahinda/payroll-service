import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreatePayrollDto {
    @IsNumber()
    @IsNotEmpty()
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
    benefits: number;
}