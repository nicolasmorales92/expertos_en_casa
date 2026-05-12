import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { CreateProfessionalProfileDto } from '../auth/dto´s/createProfessionalProfile.dto';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @ApiParam({name: 'userDni', type: 'string', required: true})
  @Post(':userDni')
  async createProfessional(
    @Param('userDni') userDni: string,
    @Body() createProfessionalDto: CreateProfessionalProfileDto) {

    const newProfessional = await this.professionalsService.createProfessional(userDni, createProfessionalDto);

    return {
      message: `Usuario registrado exitosamente. Aguarde hasta 2 días habíles para la verificacíon y habilitación de los datos profesionales.`,
      data: newProfessional
    }
  }

  @ApiQuery({name: 'page', type: 'string', required: false})
  @ApiQuery({name: 'limit', type: 'string', required: false})
  @Get()
  async findProfessionals(
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNum = Number(page) 
    const limitNum = Number(limit)

    const validPage = pageNum > 0 ? pageNum : 1
    const validLimit = limitNum > 0 ? limitNum : 5

    return this.professionalsService.findProfessionals(validPage, validLimit);
  }

  @ApiParam({name: 'id', type: 'string', required: true})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.professionalsService.findById(id);
  }


  @ApiParam({name: 'id', type: 'string', required: true})
  @Patch(':id')
  async updateProfessional(
    @Param('id') id: string, @Body() 
    updateProfessionalDto: UpdateProfessionalDto) {
    const professional = await this.professionalsService.updateProfessional(id, updateProfessionalDto);
    return{
      message: `Profesional ${professional.user.first_name} ${professional.user.last_name} actualizado correctamente.`,
      professional: professional
    }
  }


  @ApiParam({name: 'id', type: 'string', required: true})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const professional = await this.professionalsService.remove(id)
    return{
      message: `Profesional ${professional.user.first_name} ${professional.user.last_name} deshabilitado correctamente.`
    }
  }
}
