import { Vehicle } from '@/domain/fastRoute/enterprise/entities/deliveryman'
import { CreateDeliverymanUseCase } from './create-deliveryman'
import { CreateUserUseCase } from '../create-user'
import { Either, right } from '@/core/repositories/either'
import { ResourceAlreadyExists } from '../../../errors/resource-already-exists-error'

interface RegisterDeliverymanRequest {
  name: string
  cpf: string
  email: string
  phone: string
  password: string
  driveLicense: string
  vehicle: Vehicle
}

type RegisterDeliverymanResponse = Either<
  ResourceAlreadyExists,
  {
    userId: string
    deliverymanId: string
  }
>

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
    const userResult = await this.createUser.execute({
      name,
      cpf,
      email,
      phone,
      password,
      role: ['DELIVERYMAN'],
    })

    if (userResult.isLeft()) {
      throw userResult.value
    }

    const { user } = userResult.value

    const deliverymanResult = await this.createDeliveryman.execute({
      userId: user.id.toString(),
      driveLicense,
      vehicle,
    })

    if (deliverymanResult.isLeft()) {
      throw deliverymanResult.value
    }

    const { deliveryman } = deliverymanResult.value

    return right({
      userId: user.id.toString(),
      deliverymanId: deliveryman.id.toString(),
    })
  }
}
