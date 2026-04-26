import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../enums/roles";
import { ProfessionalProfile } from "../../professionals/entities/professional.entity";
import { Message } from "../../messages/entities/message.entity";
import { Chat } from "../../chat/entities/chat.entity";
import { Appointment } from "../../appointments/entity/appointment.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false, length: 30 })
    first_name: string;

    @Column({ type: 'varchar', nullable: false, length: 30 })
    last_name: string;

    @Column({ length: 50, nullable: false, type: 'varchar', unique: true })
    email: string;

    @Column({ nullable: true, type: 'varchar' })
    password: string;

    @Column({ nullable: true, type: 'varchar' })
    profileImageUrl?: string;

    @Column({ type: 'varchar', nullable: false, unique: true, length: 15 })
    dni: string;

    @Column({ type: 'varchar', nullable: false })
    province: string

    @Column({ type: 'varchar', nullable: false })
    city: string

    @Column({ type: 'varchar', nullable: true }) 
    address: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.User })
    role: RoleEnum

    @OneToOne(() => ProfessionalProfile, (prof) => prof.user, { nullable: true, cascade: true })
    professionalProfile?: ProfessionalProfile;

    @OneToMany(()=> Message, (message)=> message.sender)
    sentMessages: Message[]

    @OneToMany(()=> Chat, (chat)=>chat.client)
    chats: Chat[]

    @OneToMany(()=> Appointment , (appoint)=>appoint.client)
    appointments: Appointment[]
}
