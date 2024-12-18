import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './payroll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payroll])],
  providers: [PayrollService],
  controllers: [PayrollController]
})
export class PayrollModule {}
