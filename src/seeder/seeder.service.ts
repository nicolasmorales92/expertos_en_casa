import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import dataProfessionals from "./professionals.helpers.json"
import dataCategories from "./categories.helpres.json"
import { User } from "../users/entities/user.entity";
import { In, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { RoleEnum } from "../users/enums/roles";
import { ProfessionalStatusEnum } from "../professionals/enum/status";
import { CategoriesService } from "../categories/categories.service";
import { Categories } from "../categories/entities/category.entity";
import { privateDecrypt } from "crypto";

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>
    ) { }
    private mayuscula(text: string): string {
        if (!text) return '';
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }



    async seeder() {
        for (const category of dataCategories) {
            try {
                const exist = await this.categoriesRepository.findOne({ where: { name: category.name } })
                if (exist) {
                    throw new BadRequestException('Error al cargar seeder, categorías repetidas.')
                }

                await this.categoriesRepository.save(category)
            }
            catch (error) {
                console.log('error al cargar seeder categories', error)
            }
            console.log('seeder categorias cargado correctamente')

        }


        for (const professionals of dataProfessionals) {
            try {
                const exist = await this.userRepository.findOne({ where: { dni: professionals.dni } })
                if (exist) {
                    throw new BadRequestException('Error al cargar seeder, profesionales repetidos.')
                }

                if (!exist) {
                    const passHash = await bcrypt.hash(professionals.password, 10)

                    const listCategories = await this.categoriesRepository.findBy({
                        name: In(professionals.professionalProfile.categories)
                    });

                    const newUser = this.userRepository.create({
                        ...professionals,
                        first_name: this.mayuscula(professionals.first_name),
                        last_name: this.mayuscula(professionals.last_name),
                        province: this.mayuscula(professionals.province),
                        city: this.mayuscula(professionals.city),
                        address: this.mayuscula(professionals.address),
                        role: professionals.role as RoleEnum,
                        professionalProfile: {
                            categories: listCategories,
                            license: (professionals.professionalProfile.license as string[]) || [],
                            status: professionals.professionalProfile.status as ProfessionalStatusEnum,
                            description: professionals.professionalProfile.description,
                            chats: professionals.professionalProfile.chats,
                            appointments: professionals.professionalProfile.appointments
                        }
                    })

                    await this.userRepository.save(newUser);
                }
            }
            catch (error) {
                console.log('error en el seeder', error)
            }
        }
        console.log('seeder profesionals cargado correctamente')
    }
}