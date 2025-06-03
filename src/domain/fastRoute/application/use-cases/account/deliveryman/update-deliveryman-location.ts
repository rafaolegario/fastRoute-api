import {
  currentLocation,
  Deliveryman,
} from '@/domain/fastRoute/enterprise/entities/deliveryman'
import { DeliverymansRepository } from '../../../repositories/deliverymans-repository'
import { Either, left, right } from '@/core/repositories/either'
import { ResourceNotFound } from '../../../errors/resource-not-found-error'

interface UpdateDeliverymanLocationRequest {
  deliverymanId: string
  currentLocation: currentLocation
}

type UpdateDeliverymanLocationResponse = Either<
  ResourceNotFound,
  {
    deliveryman: Deliveryman
  }
>

export class UpdateDeliverymanLocationUseCase {
  constructor(private deliverymansRepository: DeliverymansRepository) {}

  async execute({
    currentLocation,
    deliverymanId,
  }: UpdateDeliverymanLocationRequest): Promise<UpdateDeliverymanLocationResponse> {
    const deliveryman =
      await this.deliverymansRepository.findById(deliverymanId)

    if (!deliveryman) {
      return left(new ResourceNotFound('Deliveryman', `id: ${deliverymanId}`))
    }

    const { latitude, longitude } = currentLocation

    deliveryman.setLocation(latitude, longitude)

    await this.deliverymansRepository.save(deliveryman)

    return right({ deliveryman })
  }
}
