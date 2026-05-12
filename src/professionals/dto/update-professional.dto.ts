import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalProfileDto } from '../../auth/dto´s/createProfessionalProfile.dto';

export class UpdateProfessionalDto extends PartialType(CreateProfessionalProfileDto) {}
