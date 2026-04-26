import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ProfessionalStatusEnum } from "../enum/status";
import { CategoryEnum } from "../enum/category";
import { Chat } from "../../chat/entities/chat.entity";
import { Appointment } from "../../appointments/entity/appointment.entity";

@Entity("professionals")
export class ProfessionalProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: CategoryEnum, nullable: false })
    category: CategoryEnum

    @Column({ type: 'varchar', nullable: true, unique: true})
    license?: string

    @Column({ type: 'varchar', nullable: true })
    description?: string

    @Column({ type: 'enum', enum: ProfessionalStatusEnum, default: ProfessionalStatusEnum.Pendiente })
    status: ProfessionalStatusEnum;

    @OneToOne(() => User, (user) => user.professionalProfile)
    @JoinColumn()
    user: User;

    @OneToMany(()=> Chat, (chat)=>chat.professional)
    chats: Chat[]

    @OneToMany(()=> Appointment, (appoint)=> appoint.professional)
    appointments: Appointment[]
}
