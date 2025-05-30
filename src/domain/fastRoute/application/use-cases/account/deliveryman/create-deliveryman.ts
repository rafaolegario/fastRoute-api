import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Deliveryman,
  Vehicle,
} from '@/domain/fastRoute/enterprise/entities/deliveryman'
import { DeliverymansRepository } from '../../../repositories/deliverymans-repository'

interface CreateDeliverymanRequest {
  userId: string
  driveLicense: string
  vehicle: Vehicle
}

interface CreateDeliverymanResponse {
  deliveryman: Deliveryman
}

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
      throw new Error('Deliveryman already exists')
    }

    const deliveryman = Deliveryman.create({
      userId: new UniqueEntityID(userId),
      driveLicense,
      vehicle,
    })

    await this.deliverymansRepository.create(deliveryman)

    console.log(deliveryman)

    return { deliveryman }
  }
}
