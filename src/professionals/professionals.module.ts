import { forwardRef, Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalProfile } from './entities/professional.entity';
import { ProfessionalProfileRepository } from './professionals.repository';
import { Chat } from '../chat/entities/chat.entity';
import { Appointment } from '../appointments/entity/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessionalProfile])],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService, ProfessionalProfileRepository],
  exports: [ProfessionalsService,ProfessionalProfileRepository, TypeOrmModule]
})
export class ProfessionalsProfileModule {}
