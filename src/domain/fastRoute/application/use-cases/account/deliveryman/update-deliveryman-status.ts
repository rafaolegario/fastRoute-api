import { Deliveryman } from '@/domain/fastRoute/enterprise/entities/deliveryman'
import { DeliverymansRepository } from '../../../repositories/deliverymans-repository'
import { Either, left, right } from '@/core/repositories/either'
import { ResourceNotFound } from '../../../errors/resource-not-found-error'

interface UpdateDeliverymanStatusRequest {
  deliverymanId: string
  status: 'ONLINE' | 'OFFLINE'
}

type UpdateDeliverymanStatusResponse = Either<
  ResourceNotFound,
  {
    deliveryman: Deliveryman
  }
>

export class UpdateDeliverymanStatusUseCase {
  constructor(private deliverymansRepository: DeliverymansRepository) {}

  async execute({
    deliverymanId,
    status,
  }: UpdateDeliverymanStatusRequest): Promise<UpdateDeliverymanStatusResponse> {
    const deliveryman =
      await this.deliverymansRepository.findById(deliverymanId)

    if (!deliveryman) {
      return left(new ResourceNotFound('Deliveryman', `id: ${deliverymanId}`))
    }

    deliveryman.toggleStatus(status)

    await this.deliverymansRepository.save(deliveryman)

    return right({ deliveryman })
  }
}
