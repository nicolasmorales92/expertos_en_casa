import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Categories } from "../../categories/entities/category.entity";

export class CreateProfessionalProfileDto {
    @ApiProperty({
        description: 'Categoria',
        example: ['Plomero']
    })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    categories: string[]


    @ApiProperty({
        description: 'Licencia',
        example: ['ANV-443']
    })
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    license?: string[]

    
    @ApiProperty({
        description: 'Descripción',
        example: 'plomero de confianza y garantía de buenos resultados, Barato.',
    })
    @IsOptional()
    @IsString()
    description?: string
}