import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Deliveryman,
  Vehicle,
} from '@/domain/fastRoute/enterprise/entities/deliveryman'
import { DeliverymansRepository } from '../../../repositories/deliverymans-repository'
import { Either, left, right } from '@/core/repositories/either'
import { ResourceAlreadyExists } from '@/domain/fastRoute/application/errors/resource-already-exists-error'

interface CreateDeliverymanRequest {
  userId: string
  driveLicense: string
  vehicle: Vehicle
}

type CreateDeliverymanResponse = Either<
  ResourceAlreadyExists,
  {
    deliveryman: Deliveryman
  }
>

export class CreateDeliverymanUseCase {
  constructor(private deliverymansRepository: DeliverymansRepository) {}

  async execute({
    userId,
    driveLicense,
    vehicle,
  }: CreateDeliverymanRequest): Promise<CreateDeliverymanResponse> {
    const deliverymanAlreadyExists =
      await this.deliverymansRepository.findByUserId(userId)

    if (deliverymanAlreadyExists) {
      return left(new ResourceAlreadyExists('DeliveryMan', `UserId: ${userId}`))
    }

    const deliveryman = Deliveryman.create({
      userId: new UniqueEntityID(userId),
      driveLicense,
      vehicle,
    })

    await this.deliverymansRepository.create(deliveryman)

    return right({ deliveryman })
  }
}
