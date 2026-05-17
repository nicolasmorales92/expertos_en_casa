import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entity/appointment.entity';
import { AppointmentRepository } from './appointments.repository';
import { ResponseAppointmentClient } from './dto/response.appointmentsClient.dto';
import { ProfessionalsService } from '../professionals/professionals.service';
import { ResponseAppointmentProfessionals } from './dto/response.appointmentsProfessionals.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly professionalService: ProfessionalsService,
    private readonly appointmentRepository: AppointmentRepository
  ) { }

  private toResponseAppointmentClients(data: Appointment) {
    return {
      firstName_professional: data.professional.user.first_name,
      lastName_professional: data.professional.user.last_name,
      date: data.date,
      hour: data.hour,
      desctription: data.description,
      address: data.address,
      price: data.price,
      paymentMethod: data.paymentMethod,
      isPaid: data.isPaid,
      status: data.status,
    }
  }


  private toResponseAppointmentProfessionals(data: Appointment) {
    return {
      firstName_client: data.client.first_name,
      lastName_client: data.client.last_name,
      date: data.date,
      hour: data.hour,
      desctription: data.description,
      address: data.address,
      price: data.price,
      paymentMethod: data.paymentMethod,
      isPaid: data.isPaid,
      status: data.status,
    }
  }



  async create(createAppointmentDto: CreateAppointmentDto, userId: string): Promise<ResponseAppointmentClient> {

    const foundProfessional = await this.professionalService.findById(createAppointmentDto.professionalId)
    if (!foundProfessional) throw new NotFoundException('No se encontró al profesional seleccionado.')
    if (foundProfessional.is_active === false) throw new BadRequestException('El profesional tiene la cuenta desactivada actúalmente.')

    console.log("profesional: ", foundProfessional.user.first_name)
    const { professionalId, ...appointmentData } = createAppointmentDto;

    const newAppointment = await this.appointmentRepository.create({
      ...appointmentData,
      professional: { id: professionalId },
      client: { id: userId },
    })

    const appointmentComplete = await this.findById(newAppointment.id)
    if (!appointmentComplete) throw new ConflictException('error inesperado.')

    return this.toResponseAppointmentClients(appointmentComplete)

  }


  async findById(id: string) {

    const foundAppointment = await this.appointmentRepository.findById(id);
    if (!foundAppointment) throw new NotFoundException('no hay turno.')
    return foundAppointment
  }



  async appointmentsClients(userId: string):Promise<ResponseAppointmentClient[]> {
    const appointments = await this.appointmentRepository.appointmentsClients(userId);
    const response = appointments.map((appoint)=> this.toResponseAppointmentClients(appoint))

    return response
  }



  async appointmentsProfessionals(userId: string) :Promise<ResponseAppointmentProfessionals[]>{
    const appointments = await this.appointmentRepository.appointmentsProfessionals(userId);
    const response = appointments.map((appoint)=> this.toResponseAppointmentProfessionals(appoint))

    return response
  }




  async appointmentCancel (id: string, userId: string) {
    const foundAppointment = await this.appointmentRepository.findById(id)
    if(!foundAppointment) throw new NotFoundException('No se encontró el turno.')
    
    if(foundAppointment.client.id !== userId) throw new BadRequestException('El turno pertenece a otro usuario. No puedes cancelar el turno de otro usuario.')
    
    return await this.appointmentRepository.appointmentCancel(id)
  }
}
