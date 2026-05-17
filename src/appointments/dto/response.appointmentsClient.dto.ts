import { PaymentMethodEnum } from "../enum/paymentMethod.enum"
import { AppointmentStatusEnum } from "../enum/statusAppointments.enum"

export class ResponseAppointmentClient {
    firstName_professional: string
    lastName_professional: string
    date: string
    hour: string
    desctription: string
    address: string
    price: number
    paymentMethod: PaymentMethodEnum
    isPaid: boolean
    status: AppointmentStatusEnum
}