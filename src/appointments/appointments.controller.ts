import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Roles } from '../auth/decoradores/role.decorador';
import { RoleEnum } from '../users/enums/roles';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}


  @ApiBearerAuth()
  @Roles(RoleEnum.User)
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req: any) {
    const userId = req.user.id
    return await this.appointmentsService.create(createAppointmentDto, userId)
  }


  @ApiBearerAuth()
  @Roles(RoleEnum.User)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('clients')
  async appointmentsClients(@Req() req:any) {
    const userId = req.user.id
    return await this.appointmentsService.appointmentsClients(userId);
  }


  @ApiBearerAuth()
  @Roles(RoleEnum.Professional)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('professionals')
  async appointmentsProfessionals(@Req() req:any) {
    const userId = req.user.id
    return await this.appointmentsService.appointmentsProfessionals(userId);
  }


  @ApiBearerAuth()
  @Roles(RoleEnum.User)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async appointmentCancel (@Param('id') id: string, @Req() req:any) {
    const userId = req.user.id
    const appointment = await this.appointmentsService.appointmentCancel(id, userId);
    return {
      message: `Se canceló el turno ${appointment.id} correctamente.`
    }
  }
}
