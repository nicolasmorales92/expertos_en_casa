import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ProfessionalsProfileModule } from '../professionals/professionals.module';

@Module({
  imports: [UsersModule, ProfessionalsProfileModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
