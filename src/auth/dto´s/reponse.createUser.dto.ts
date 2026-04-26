import { CategoryEnum } from "../../professionals/enum/category";
import { RoleEnum } from "../../users/enums/roles";

export class ResponseCreateUserDto {
    first_name: string
    last_name: string
    email: string
    dni: string
    role: RoleEnum
    category?: CategoryEnum
}