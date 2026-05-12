import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ProfessionalsProfileModule } from '../professionals/professionals.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [UsersModule, ProfessionalsProfileModule, CategoriesModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
