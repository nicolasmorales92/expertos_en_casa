import { PaymentMethodEnum } from "../enum/paymentMethod.enum"
import { AppointmentStatusEnum } from "../enum/statusAppointments.enum"

export class ResponseAppointmentProfessionals {
    firstName_client: string
    lastName_client: string
    date: string
    hour: string
    desctription: string
    address: string
    price: number
    paymentMethod: PaymentMethodEnum
    isPaid: boolean
    status: AppointmentStatusEnum
}