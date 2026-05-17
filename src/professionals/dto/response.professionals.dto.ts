import { ResponseAppointmentProfessionals } from "../../appointments/dto/response.appointmentsProfessionals.dto";
import { ResponseCreateUserDto } from "../../auth/dto´s/reponse.createUser.dto";
import { ResponseCategoriesDto } from "../../categories/dto/response.categories.dto";

export class ResponseProfessionalsDto {
    id: string
    user: ResponseCreateUserDto
    categories: ResponseCategoriesDto[]
    license?: string[]
    description?: string
    is_active: boolean
    appointments: ResponseAppointmentProfessionals[]
}