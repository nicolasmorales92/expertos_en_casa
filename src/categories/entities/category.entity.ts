import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProfessionalProfile } from "../../professionals/entities/professional.entity";

@Entity('categories')
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar', nullable: false})
    name: string

    @ManyToMany( ()=> ProfessionalProfile, (prof)=> prof.categories)
    professionals : ProfessionalProfile[]
}
