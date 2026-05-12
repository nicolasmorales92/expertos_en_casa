import { BadRequestException, ConflictException, Injectable, NotFoundException  } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { ResponseCreateUserDto } from '../auth/dto´s/reponse.createUser.dto';
import { CategoryEnum } from '../professionals/enum/category';
import { RoleEnum } from './enums/roles';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }
  async findAll(role?: RoleEnum, page?: number, limit?: number): Promise<ResponseCreateUserDto[]> {
    if(role){
      const searchRole = await this.userRepository.findAll(role)
      if(searchRole.length === 0) throw new NotFoundException('No se encontraron clientes con ese rol')
    }
    let skip = 1
    let take = 5

    if (page && limit) {
      skip = (page - 1) * limit
      take = limit
    }

    const listUsers = await this.userRepository.findAll(role, skip, take);
    return listUsers.map((info) => {
      return {
        first_name: info.first_name,
        last_name: info.last_name,
        dni: info.dni,
        email: info.email,
        role: info.role,
      }
    })
  }

  async findByDni(dni: string):Promise<ResponseCreateUserDto> {
    const user = await this.userRepository.findByDni(dni)
    if (!user) throw new NotFoundException('Usuario no encontrado')

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      dni: user.dni,
      email: user.email,
      role: user.role,
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<ResponseCreateUserDto> {
    const user = await this.userRepository.findById(id)
    if(!user) throw new NotFoundException('Usuario no encontrado')

    if(updateUserDto.email){
       const userFound = await this.userRepository.findByEmail(user.email)
       if(userFound){
       throw new ConflictException('El email ya existe')
       }
    }


    const updateUser = await this.userRepository.update(id, updateUserDto)
    return {
      first_name: updateUser.first_name ,
      last_name: updateUser.last_name,
      dni: updateUser.dni,
      email: updateUser.email,
      role: updateUser.role,
    }
  }

  async remove(id: string) {
   return await this.userRepository.remove(id)
  }




  async findByEmail(email: string) {
    const emailExisting = await this.userRepository.findByEmail(email)
    if (emailExisting) throw new ConflictException('El email ya existe')

    return emailExisting
  }



}
