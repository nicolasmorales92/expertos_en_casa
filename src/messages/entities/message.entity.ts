import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Chat } from '../../chat/entities/chat.entity';


@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.sentMessages, { nullable: false })
  sender: User;

  // SALA
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @Column({ default: false })
  isRead: boolean;
}