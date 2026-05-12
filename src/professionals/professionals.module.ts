import { forwardRef, Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalProfile } from './entities/professional.entity';
import { ProfessionalProfileRepository } from './professionals.repository';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessionalProfile]), UsersModule, CategoriesModule],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService, ProfessionalProfileRepository],
  exports: [ProfessionalsService, ProfessionalProfileRepository, TypeOrmModule]
})
export class ProfessionalsProfileModule {}
