import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseCreateUserDto } from '../auth/dto´s/reponse.createUser.dto';
import { RoleEnum } from './enums/roles';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}
    async findAll(role?: RoleEnum, skip?: number, take?: number) {
        return await this.userRepository.find({
            skip, 
            take, 
            relations: ['professionalProfile'],
            where: role ? {role} : {}
        })
    }

    async findByDni(dni: string){
        return await this.userRepository.findOne({
            relations: ['professionalProfile'],
            where: {dni: dni}
        })
    }

    async findByEmail(email: string){
        return await this.userRepository.findOneBy({email})
    }
}