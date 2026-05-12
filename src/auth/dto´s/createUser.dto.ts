import { IsEmail, IsEnum, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, IsStrongPassword, Length, Matches, ValidateIf, ValidateNested } from "class-validator";
import { RoleEnum } from "../../users/enums/roles";
import { CreateProfessionalProfileDto } from "./createProfessionalProfile.dto";
import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example: 'Juan',
    })
    @IsNotEmpty()
    @IsString()
    first_name: string

    @ApiProperty({
        example: 'Perez',
    })
    @IsNotEmpty()
    @IsString()
    last_name: string

    @ApiProperty({
        example: 'juanperez@mail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'Abc1234!',
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @ApiProperty({
        example: '37121212',
    })
    @IsString()
    @IsNotEmpty()
    dni: string

    @ApiProperty({
        example: 'Buenos Aires',
    })
    @IsNotEmpty()
    @IsString()
    province: string

    @ApiProperty({
        example: 'San Isidro',
    })
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty({
        example: 'Av. San Martin 123',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/.*\s\d+$/, {
        message: "La dirección debe contener calle y altura (ej: Av. San Martin 435)"
    })
    address: string

    @ApiProperty({
        example: 'professional' 
    })
    @IsOptional()
    @IsEnum(RoleEnum)
    role?: RoleEnum 
}


export class CreateUserProfessionalDto extends IntersectionType(
  CreateUserDto,
  PartialType(CreateProfessionalProfileDto)
) {}