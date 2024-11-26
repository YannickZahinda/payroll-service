import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayrollModule } from './payroll/payroll.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './payroll/payroll.entity';

@Module({
  imports: [
    PayrollModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      entities: [Payroll],
      synchronize: true,

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}