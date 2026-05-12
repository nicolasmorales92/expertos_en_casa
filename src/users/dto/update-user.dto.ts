import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../auth/dto´s/createUser.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['dni'] as const)) {}
