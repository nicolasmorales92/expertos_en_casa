import { IsEmail, IsEnum, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, IsStrongPassword, Length, Matches, ValidateIf, ValidateNested } from "class-validator";
import { RoleEnum } from "../../users/enums/roles";
import { Type } from "class-transformer";
import { CreateProfessionalProfileDto } from "./createProfessionalProfile.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'Primer nombre',
        example: 'Juan',
    })
    @IsNotEmpty()
    @IsString()
    first_name: string

    @ApiProperty({
        description: 'Apellido',
        example: 'Perez',
    })
    @IsNotEmpty()
    @IsString()
    last_name: string

    @ApiProperty({
        description: 'Correo electrónico del usuario (único)',
        example: 'juanperez@mail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'Contraseña',
        example: 'Abc1234!',
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @ApiProperty({
        description: 'Documento de identificación único',
        example: '37121212',
    })
    @IsString()
    @IsNotEmpty()
    dni: string

    @ApiProperty({
        description: 'Provincia',
        example: 'Buenos Aires',
    })
    @IsNotEmpty()
    @IsString()
    province: string

    @ApiProperty({
        description: 'Ciudad',
        example: 'San Isidro',
    })
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty({
        description: 'Nombre de la calle y su altura',
        example: 'Av. San Martin 123',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/.*\s\d+$/, {
        message: "La dirección debe contener calle y altura (ej: Av. San Martin 435)"
    })
    address: string

    @IsOptional()
    @IsEnum(RoleEnum)
    role?: RoleEnum

    @ApiProperty({
        description: 'Datos del profesional'
    })
    @ValidateIf((o) => o.role === RoleEnum.Professional)
    @IsNotEmpty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateProfessionalProfileDto)
    professionalProfile?: CreateProfessionalProfileDto;
}