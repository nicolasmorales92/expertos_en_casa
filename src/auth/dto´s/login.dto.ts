import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
    @ApiProperty({
        example: 'juanperez@mail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        example: '********'
    })
    @IsNotEmpty()
    @IsStrongPassword()
    @IsString()
    password: string
}