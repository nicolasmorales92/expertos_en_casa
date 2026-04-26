import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';
import { ProfessionalProfile } from '../../professionals/entities/professional.entity';


@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.chats, { nullable: false })
  client: User;

  @ManyToOne(() => ProfessionalProfile, (professional) => professional.chats, { nullable: false })
  professional: ProfessionalProfile;

  @OneToMany(() => Message, (message) => message.chat, {cascade: true})
  messages: Message[];
}