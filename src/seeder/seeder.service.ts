import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import data from "./data.helpers.json"
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { RoleEnum } from "../users/enums/roles";
import { ProfessionalStatusEnum } from "../professionals/enum/status";
import { CategoryEnum } from "../professionals/enum/category";

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    async seeder() {

        for (const user of data) {
            try {
                const exist = await this.userRepository.findOne({ where: { dni: user.dni } })
                if (exist) {
                }

                if (!exist) {
                    const passHash = await bcrypt.hash(user.password, 10)

                    const newUser = this.userRepository.create({
                        ...user,
                        password: passHash,
                        role: user.role as RoleEnum,
                        professionalProfile: {
                            category: user.professionalProfile.category as CategoryEnum,
                            license: user.professionalProfile.license,
                            status: user.professionalProfile.status as ProfessionalStatusEnum,
                            description: user.professionalProfile.description,
                            chats: user.professionalProfile.chats,
                            appointments: user.professionalProfile.appointments
                        }
                    })

                    await this.userRepository.save(newUser);
                }
            }
            catch (error) {
                console.log('error en el seeder', error)
            }
        }
        console.log('seeder cargado correctamente')
    }
}