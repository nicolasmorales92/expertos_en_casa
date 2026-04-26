import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto´s/createUser.dto';
import { UserRepository } from '../users/users.repository';
import { ProfessionalProfileRepository } from '../professionals/professionals.repository';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfessionalProfile } from '../professionals/entities/professional.entity';
import { ResponseCreateUserDto } from './dto´s/reponse.createUser.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly userRepository: UserRepository,
    @InjectRepository(ProfessionalProfile)
    private readonly professionalProfileRepo: Repository<ProfessionalProfile>,
    private readonly professionalProfileRepository: ProfessionalProfileRepository
  ){}

  async create(createUserDto: CreateUserDto):Promise<ResponseCreateUserDto> {
    const emailExisting = await this.userRepository.findByEmail(createUserDto.email)
      if(emailExisting) throw new ConflictException('Usuario existente')
    const dni = await this.userRepository.findByDni(createUserDto.dni)
      if(dni) throw new ConflictException('Usuario existente')


    
    const passHash = await bcrypt.hash(createUserDto.password, 10)
    const createUser = await this.userRepo.create({
      ...createUserDto,
      password: passHash
    })
    
    const savedUser = await this.userRepo.save(createUser)
    return {
        first_name: savedUser.first_name,
        last_name: savedUser.last_name,
        email: savedUser.email,
        dni: savedUser.dni,
        role: savedUser.role,
        category: savedUser.professionalProfile?.category
    };
  }

}
