import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        example: "Aire Acondicionado"
    })
    @IsString()
    name: string
}
