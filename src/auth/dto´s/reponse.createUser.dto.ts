import { Expose } from "class-transformer";
import { CategoryEnum } from "../../professionals/enum/category";
import { RoleEnum } from "../../users/enums/roles";

export class ResponseCreateUserDto {
    @Expose()
    first_name: string
    @Expose()
    last_name: string
    @Expose()
    email?: string
    @Expose()
    dni?: string
    @Expose()
    role: RoleEnum
    @Expose()
    message?: string
}