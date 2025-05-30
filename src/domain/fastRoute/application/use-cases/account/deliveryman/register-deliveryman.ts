import { Vehicle } from '@/domain/fastRoute/enterprise/entities/deliveryman'
import { CreateDeliverymanUseCase } from './create-deliveryman'
import { CreateUserUseCase } from '../create-user'

interface RegisterDeliverymanRequest {
  name: string
  cpf: string
  email: string
  phone: string
  password: string
  driveLicense: string
  vehicle: Vehicle
}

interface RegisterDeliverymanResponse {
  userId: string
  deliverymanId: string
}

export class RegisterDeliverymanUseCase {
  constructor(
    private createUser: CreateUserUseCase,
    private createDeliveryman: CreateDeliverymanUseCase,
  ) {}

  async execute({
    name,
    cpf,
    email,
    phone,
    password,
    driveLicense,
    vehicle,
  }: RegisterDeliverymanRequest): Promise<RegisterDeliverymanResponse> {
    const { user } = await this.createUser.execute({
      name,
      cpf,
      email,
      phone,
      password,
      role: ['DELIVERYMAN'],
    })

    const { deliveryman } = await this.createDeliveryman.execute({
      userId: user.id.toString(),
      driveLicense,
      vehicle,
    })

    return {
      userId: user.id.toString(),
      deliverymanId: deliveryman.id.toString(),
    }
  }
}
