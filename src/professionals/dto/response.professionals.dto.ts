import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { ResponseCreateUserDto } from "../../auth/dto´s/reponse.createUser.dto";
import { CategoryEnum } from "../enum/category";
import { ResponseAppointmentsDto } from "../../appointments/dto/response.appointments.dto";
import { Categories } from "../../categories/entities/category.entity";
import { ResponseCategoriesDto } from "../../categories/dto/response.categories.dto";

export class ResponseProfessionalsDto {
    id: string
    user: ResponseCreateUserDto
    categories: ResponseCategoriesDto[]
    license?: string[]
    description?: string
    is_active: boolean
    appointments: ResponseAppointmentsDto[]
}