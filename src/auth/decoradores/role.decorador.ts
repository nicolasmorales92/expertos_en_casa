import { SetMetadata } from "@nestjs/common"
import { RoleEnum } from "../../users/enums/roles"

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles)