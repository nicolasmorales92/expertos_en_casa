import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfessionalProfile } from "./entities/professional.entity";
import { Repository } from "typeorm";
import { CreateProfessionalProfileDto } from "../auth/dto´s/createProfessionalProfile.dto";
import { UsersService } from "../users/users.service";
import { ProfessionalStatusEnum } from "./enum/status";
import { UpdateProfessionalDto } from "./dto/update-professional.dto";
import { CategoriesService } from "../categories/categories.service";
import { User } from "../users/entities/user.entity";
import { Categories } from "../categories/entities/category.entity";

@Injectable()
export class ProfessionalProfileRepository {
    constructor(
        @InjectRepository(ProfessionalProfile)
        private readonly professionalProfileRepository: Repository<ProfessionalProfile>,
        private readonly userService: UsersService,
        private readonly categoriesService: CategoriesService

    ) { }

async createProfessional(
  user: User,
  categories: Categories[],
  license?: string[],
  description?: string
) {
  const newProfessional = this.professionalProfileRepository.create({
    user: user,
    categories: categories, 
    license: license,       
    description: description,
    status: ProfessionalStatusEnum.Pendiente,
  });

  return await this.professionalProfileRepository.save(newProfessional);
}

    async findById(id: string){
        return await this.professionalProfileRepository.findOne({
            where: {id: id},
            relations:['user','appointments','categories']
        })
    }


    async updateProfessional (id: string, updateProfessionalDto: UpdateProfessionalDto){
        const foundProfessional = await this.professionalProfileRepository.findOne({
            where: {id: id},
            relations: ['user', 'appointments','categories']
        })
        if(!foundProfessional) throw new NotFoundException('Profesional no encontrado')

            for(const key in updateProfessionalDto){
                if(updateProfessionalDto[key] !== undefined){
                    foundProfessional[key] = updateProfessionalDto[key]
                }
            }

        return await this.professionalProfileRepository.save(foundProfessional)
    }


    async findProfessionals (skip?: number, take?: number){
        return await this.professionalProfileRepository.find({
            skip,
            take,
            relations: ['user','appointments', 'categories']
        })
    }




    async remove(id: string){
       const foundProfessional = await this.professionalProfileRepository.findOne({
        where: {id: id},
        relations: ['user']
       })
       if (!foundProfessional) throw new NotFoundException('Professional no encontrado')

       foundProfessional.is_active = false

       return await this.professionalProfileRepository.save(foundProfessional)
    }




    async findByLicense(license: string[]) {
        return await this.professionalProfileRepository
            .createQueryBuilder('profile')
            .where('profile.license && :license', {license})
            .getOne()
    }
}

