import { InjectRepository } from "@nestjs/typeorm";
import { Appointment } from "./entity/appointment.entity";
import { DeepPartial, Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { AppointmentStatusEnum } from "./enum/statusAppointments.enum";


export class AppointmentRepository {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>
    ) { }

    async create(data: DeepPartial<Appointment>) {
        const createAppointment = this.appointmentRepository.create(data)
        return await this.appointmentRepository.save(createAppointment)
    }

    async findById(id: string) {
        return await this.appointmentRepository.findOne({
            where: { id: id },
            relations: ['professional', 'professional.user', 'client']
        })
    }




    async appointmentsClients(userId: string) {
        return await this.appointmentRepository.find({
            where: { client: { id: userId } },
            relations: ['professional', 'professional.user', 'client']
        })
    }



    async appointmentsProfessionals(userId: string) {
        return await this.appointmentRepository.find({
            where: { professional: { user: { id: userId } } },
            relations: ['professional', 'professional.user', 'client']
        })
    }




    async appointmentCancel (id: string) {
        const foundAppointment = await this.appointmentRepository.findOneBy({id})
        if(!foundAppointment) throw new NotFoundException('No se encontró el turno')
        if(foundAppointment.status === AppointmentStatusEnum.CANCELADO ||
             foundAppointment.status === AppointmentStatusEnum.RECHAZADO) {
                throw new BadRequestException('El turno ya había sído cancelado.')
            }
        if(foundAppointment.status === AppointmentStatusEnum.COMPLETADO) {
            throw new BadRequestException('No se puede cancelar un turno completado.')
        }

        foundAppointment.status = AppointmentStatusEnum.CANCELADO
        return await this.appointmentRepository.save(foundAppointment)
    }

}