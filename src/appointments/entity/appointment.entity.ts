import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ProfessionalProfile } from '../../professionals/entities/professional.entity';
import { AppointmentStatusEnum } from '../enum/statusAppointments.enum';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: false })
  date: Date; // Cuándo es el turno (día y hora)

  @Column({ type: 'varchar' , nullable: false})
  description: string; 

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatusEnum,
    default: AppointmentStatusEnum.PENDIENTE,
  })
  status: AppointmentStatusEnum;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number; 

  @Column({ default: false })
  isPaid: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date; 

  @ManyToOne(() => User, (user) => user.appointments, { nullable: false })
  client: User;

  @ManyToOne(() => ProfessionalProfile, (profesional) => profesional.appointments, { nullable: false })
  professional: ProfessionalProfile;
}