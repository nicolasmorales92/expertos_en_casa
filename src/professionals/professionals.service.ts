import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { CreateProfessionalProfileDto } from '../auth/dto´s/createProfessionalProfile.dto';
import { ProfessionalProfileRepository } from './professionals.repository';
import { ResponseProfessionalsDto } from './dto/response.professionals.dto';
import { ProfessionalProfile } from './entities/professional.entity';
import { CategoriesService } from '../categories/categories.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RoleEnum } from '../users/enums/roles';

@Injectable()
export class ProfessionalsService {
  constructor(
    private readonly categoriesService: CategoriesService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly professionalRepository: ProfessionalProfileRepository
  ) { }
  private mapToResponseDto(prof: ProfessionalProfile): ResponseProfessionalsDto {
    return {
      id: prof.id,
      user: {
        first_name: prof.user?.first_name,
        last_name: prof.user?.last_name,
        role: prof.user?.role
      },
      categories: prof.categories?.map(cat => ({ name: cat.name })) || [],
      license: prof.license,
      description: prof.description,
      is_active: prof.is_active,
      appointments: prof.appointments.map( app => ({
        firstName_professional: app.professional.user.first_name,
        lastName_professional: app.professional.user.last_name,
        date: app.date,
        hour: app.hour,
        desctription: app.description,
        address: app.address,
        price: app.price,
        paymentMethod: app.paymentMethod,
        isPaid: app.isPaid,
        status: app.status,
        firstName_client: app.client.first_name,
        lastName_client: app.client.last_name
      }))
    };
  }




  async createProfessional(userDni: string, dto: CreateProfessionalProfileDto) {
    const foundUser = await this.userRepository.findOneBy({dni: userDni})
    if (!foundUser) throw new NotFoundException('Usuario no encontrado.');


    if (dto.license) {
      const existingLicense = await this.professionalRepository.findByLicense(dto.license);
      if (existingLicense) throw new ConflictException('La licencia ya está en uso.');
    }

    if (foundUser.professionalProfile) {
      throw new ConflictException('El usuario ya tiene su perfíl profesional.')
    }
    else {
      foundUser.role = RoleEnum.Professional
      await this.userRepository.save(foundUser)

      const categories = await this.categoriesService.listCategories(dto.categories)

      const newProfessional = await this.professionalRepository.createProfessional(
        foundUser,
        categories,
        dto.license,
        dto.description
      );

      return this.mapToResponseDto(newProfessional)
    }

  }


  async findProfessionals(page?: number, limit?: number): Promise<ResponseProfessionalsDto[]> {
    let professionals: ProfessionalProfile[];


    if (page && limit) {
      const skip = (page - 1) * limit
      const take = limit

      professionals = await this.professionalRepository.findProfessionals(skip, take)
    }
    else {
      professionals = await this.professionalRepository.findProfessionals()
    }

    return professionals.map((prof) => this.mapToResponseDto(prof))

  }



  async findById(id: string): Promise<ResponseProfessionalsDto> {
    const foundProfessional = await this.professionalRepository.findById(id)
    if (!foundProfessional) throw new NotFoundException('Professional no encontrado')

    return this.mapToResponseDto(foundProfessional)
  }




  async updateProfessional(id: string, updateProfessionalDto: UpdateProfessionalDto): Promise<ResponseProfessionalsDto> {
    if (updateProfessionalDto.license) {
      const existingLicense = await this.professionalRepository.findByLicense(updateProfessionalDto.license)
      if (existingLicense) throw new ConflictException('Licencias ya existentes.')
    }

    const updateProfessional = await this.professionalRepository.updateProfessional(id, updateProfessionalDto)
    return this.mapToResponseDto(updateProfessional)
  }




  async remove(id: string) {
    return await this.professionalRepository.remove(id)
  }
}
