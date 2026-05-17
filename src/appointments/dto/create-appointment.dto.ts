import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, Matches, Min } from "class-validator"
import { PaymentMethodEnum } from "../enum/paymentMethod.enum"
import { ApiProperty } from "@nestjs/swagger"

export class CreateAppointmentDto {
    @ApiProperty({
        example: "professionalId"
    })
    @IsNotEmpty()
    @IsString()
    professionalId: string

    @ApiProperty({
        example: "2026-05-25"
    })
    @IsNotEmpty()
    @IsDateString()
    date: string

    @ApiProperty({
        example: "10:00"
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
        message: 'La hora debe tener el formato HH:mm (24 horas)',
    })
    hour: string

    @ApiProperty({
        example: "Caño pinchado"
    })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({
        example: "Venezuela 1312"
    })
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty({
        example: "$50.000,00"
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number

    @ApiProperty({
        example: "efectivo"
    })
    @IsNotEmpty()
    @IsEnum(PaymentMethodEnum, {
        message: 'El método de pago debe ser EFECTIVO o MERCADO_PAGO',
    })
    paymentMethod: PaymentMethodEnum
}
