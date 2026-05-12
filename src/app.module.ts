import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProfessionalsProfileModule } from './professionals/professionals.module';
import { SeederModule } from './seeder/seeder.module';
import { ConfigModule  } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ProfessionalProfile } from './professionals/entities/professional.entity';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MessagesModule } from './messages/messages.module';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { Message } from './messages/entities/message.entity';
import { Appointment } from './appointments/entity/appointment.entity';
import { Categories } from './categories/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, 
      synchronize: true,
      dropSchema: true,
      entities: [User, ProfessionalProfile, Chat, Message, Appointment, Categories]
    }),
    UsersModule,
    CategoriesModule,
    ProfessionalsProfileModule,
    SeederModule,
    AuthModule,
    AppointmentsModule,
    MessagesModule,
    ChatModule],
  providers: [AppService],
})
export class AppModule { }
