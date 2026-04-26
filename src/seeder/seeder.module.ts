import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { Chat } from '../chat/entities/chat.entity';
import { Appointment } from '../appointments/entity/appointment.entity';
import { Message } from '../messages/entities/message.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]) ,
    UsersModule,
    Chat,       
    Appointment, 
    Message
  ],
  providers: [SeederService],
  exports: [SeederService]
})
export class SeederModule {}
