import { ProfessionalProfile } from "../../professionals/entities/professional.entity"
import { User } from "../../users/entities/user.entity"
import { AppointmentStatusEnum } from "../enum/statusAppointments.enum"

export class ResponseAppointmentsDto {
    id: string
    client?: User
    professional?: ProfessionalProfile
    date: Date
    isPaid: boolean
    status: AppointmentStatusEnum
}