import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserProfessionalDto } from './dto´s/createUser.dto';
import { UserRepository } from '../users/users.repository';
import { ProfessionalProfileRepository } from '../professionals/professionals.repository';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfessionalProfile } from '../professionals/entities/professional.entity';
import { ResponseCreateUserDto } from './dto´s/reponse.createUser.dto';
import { ProfessionalStatusEnum } from '../professionals/enum/status';
import { CategoriesService } from '../categories/categories.service';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly userRepository: UserRepository,
    @InjectRepository(ProfessionalProfile)
    private readonly professionalProfileRepo: Repository<ProfessionalProfile>,
    private readonly professionalProfileRepository: ProfessionalProfileRepository,
    private readonly categoriesService: CategoriesService
  ) { }

  private async createProfessionalProfile(
    user: User, 
    categories: string[],
    license?: string[], 
    description?: string
  ){
    const listCategories = await this.categoriesService.listCategories(categories)
    return this.professionalProfileRepo.create({
      user: user,           
      categories: listCategories,   
      license: license || [],    
      description: description || '',
      status: ProfessionalStatusEnum.Pendiente,         
    });
  }


  private mayuscula(text: string): string {
    if (!text) return '';
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }





  async create(createUserDto: CreateUserProfessionalDto): Promise<ResponseCreateUserDto> {

    const emailExisting = await this.userRepository.findByEmail(createUserDto.email)
    if (emailExisting) throw new ConflictException('Usuario existente')
    const dni = await this.userRepository.findByDni(createUserDto.dni)
    if (dni) throw new ConflictException('Usuario existente')


    const passHash = await bcrypt.hash(createUserDto.password, 10)
    const createUser = await this.userRepo.create({
      ...createUserDto,
      first_name: this.mayuscula(createUserDto.first_name),
      last_name: this.mayuscula(createUserDto.last_name),
      province: this.mayuscula(createUserDto.province),
      city: this.mayuscula(createUserDto.city),
      address: this.mayuscula(createUserDto.address),
      password: passHash
    })

    const savedUser = await this.userRepo.save(createUser)

    const responseDinamic = {
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      role: savedUser.role
    };

    if(savedUser.role === 'Professional'){
      if (!createUserDto.categories) 
        throw new BadRequestException('Debes elegir unaa categoría.');
  
      const newProfile = await this.createProfessionalProfile(
        savedUser,
        createUserDto.categories,
        createUserDto.license,
        createUserDto.description
      )

      const saveProfessionalProfile = this.professionalProfileRepo.save(newProfile)
      return{
        ...responseDinamic,
      message: `Se creó correctamene el usuario ${(await saveProfessionalProfile).user.first_name}. Aguarde hasta 2 días habíles para la verificacíon y habilitación de los datos profesionales.`,
      }
    }

    return{
      ...responseDinamic,
      message: `Se creó correctamene el usuario ${savedUser.first_name}`
    }
  }

}
