import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { ProfessionalsProfileModule } from '../professionals/professionals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entity/appointment.entity';
import { AppointmentRepository } from './appointments.repository';

@Module({
  imports: [
   TypeOrmModule.forFeature([Appointment]), ProfessionalsProfileModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentRepository],
})
export class AppointmentsModule {}
