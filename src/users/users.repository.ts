import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseCreateUserDto } from '../auth/dto´s/reponse.createUser.dto';
import { RoleEnum } from './enums/roles';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }
    async findAll(role?: RoleEnum, skip?: number, take?: number) {
        return await this.userRepository.find({
            skip,
            take,
            relations: ['professionalProfile'],
            where: role ? { role } : {}
        })
    }

    async findById(id: string) {
        return await this.userRepository.findOne({
            relations: ['professionalProfile'],
            where: { id: id }
        })
    }

    async findByDni(dni: string) {
        return await this.userRepository.findOne({
            relations: ['professionalProfile'],
            where: { dni: dni }
        })
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOneBy({ email })
    }


    async update(id: string, updateUserDto: UpdateUserDto){
        const userFound = await this.userRepository.findOne({  
            relations: ['professionalProfile'],
            where: { id: id } })
        if (!userFound) throw new NotFoundException('Usuario no encontrado')

        for (const key in updateUserDto) {
            if (updateUserDto[key] !== undefined) {
                userFound[key] = updateUserDto[key]
            }
        }

        return await this.userRepository.save(userFound)
    }


    async remove(id: string){
        const userFound = await this.userRepository.findOneBy({id})
        if(!userFound) throw new NotFoundException('Usuario no encontrado')

        userFound.is_active = false
        return await this.userRepository.save(userFound)
    }
}