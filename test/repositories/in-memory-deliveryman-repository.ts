import { DeliverymansRepository } from '@/domain/fastRoute/application/repositories/deliverymans-repository'
import { Deliveryman } from '@/domain/fastRoute/enterprise/entities/deliveryman'

export class InMemoryDeliverymansRepository implements DeliverymansRepository {
  public items: Deliveryman[] = []

  async create(deliveryman: Deliveryman) {
    this.items.push(deliveryman)
  }

  async save(deliveryMan: Deliveryman) {
    const ItemIndex = this.items.findIndex(
      (item) => item.id.toString() === deliveryMan.id.toString(),
    )

    this.items[ItemIndex] = deliveryMan
  }

  async findById(Id: string) {
    const DeliveryMan = this.items.find(
      (deliveryMan) => deliveryMan.id.toString() === Id,
    )

    if (!DeliveryMan) {
      return null
    }

    return DeliveryMan
  }

  async findByUserId(userId: string) {
    const DeliveryMan = this.items.find(
      (deliveryMan) => deliveryMan.userId.toString() === userId,
    )

    if (!DeliveryMan) {
      return null
    }

    return DeliveryMan
  }
}
