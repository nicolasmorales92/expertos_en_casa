import { BadRequestException, ConflictException, Injectable, NotFoundException, Query } from '@nestjs/common';
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
        category: info.professionalProfile?.category
      }
    })
  }

  async findOne(dni: string): Promise<ResponseCreateUserDto> {
    if (!dni) throw new BadRequestException('DNI inexistente')
    const user = await this.userRepository.findByDni(dni)

    if (!user) throw new NotFoundException('Usuario no encontrado')

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      dni: user.dni,
      email: user.email,
      role: user.role,
      category: user.professionalProfile?.category
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }




  async findByEmail(email: string) {
    const emailExisting = await this.userRepository.findByEmail(email)
    if (emailExisting) throw new ConflictException('El email ya existe')

    return emailExisting
  }

  async findBydni(dni: string) {
    const dniExisting = await this.userRepository.findByDni(dni)
    if (dniExisting) throw new ConflictException('El dni ya existe')

    return dniExisting
  }
}
