import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ProfessionalStatusEnum } from "../enum/status";
import { Chat } from "../../chat/entities/chat.entity";
import { Appointment } from "../../appointments/entity/appointment.entity";
import { Categories } from "../../categories/entities/category.entity";

@Entity("professionals")
export class ProfessionalProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: true, array: true}) 
    license?: string[]

    @Column({ type: 'varchar', nullable: true })
    description?: string

    @Column({ type: 'enum', enum: ProfessionalStatusEnum, default: ProfessionalStatusEnum.Pendiente })
    status: ProfessionalStatusEnum;

    @Column({type: 'boolean', default: true})
    is_active: boolean

    @OneToOne(() => User, (user) => user.professionalProfile)
    @JoinColumn()
    user: User;

    @ManyToMany(()=> Categories, (cat)=> cat.professionals)
    @JoinTable({name: "professional_categories"})
    categories: Categories[]

    @OneToMany(()=> Chat, (chat)=>chat.professional)
    chats: Chat[]

    @OneToMany(()=> Appointment, (appoint)=> appoint.professional)
    appointments: Appointment[]
}
