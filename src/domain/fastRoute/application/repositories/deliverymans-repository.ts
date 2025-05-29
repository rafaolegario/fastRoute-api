import { Deliveryman } from '../../enterprise/entities/deliveryman'

export abstract class DeliverymansRepository {
  abstract create(deliveryman: Deliveryman): Promise<void>
  abstract findByUserId(userId: string): Promise<Deliveryman | null>
  abstract findById(id: string): Promise<Deliveryman | null>
}
