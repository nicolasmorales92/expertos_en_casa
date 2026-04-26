import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CategoryEnum } from "../../professionals/enum/category";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProfessionalProfileDto {
    @ApiProperty({
        description: 'Categoria',
        example: 'Plomero',
    })
    @IsEnum(CategoryEnum)
    @IsNotEmpty()
    category: CategoryEnum

    @ApiProperty({
        description: 'Licencia',
        example: 'ANV-443',
    })
    @IsOptional()
    @IsString()
    license?: string

    @ApiProperty({
        description: 'Descripción',
        example: 'plomero de confianza y garantía de buenos resultados, Barato.',
    })
    @IsOptional()
    @IsString()
    description?: string
}