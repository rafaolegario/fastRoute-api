import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Deliveryman,
  DeliverymanProps,
} from '@/domain/fastRoute/enterprise/entities/deliveryman'

export function MakeDeliveryman(
  override: Partial<DeliverymanProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryman = Deliveryman.create(
    {
      userId: new UniqueEntityID(),
      driveLicense: faker.lorem.words(),
      vehicle: {
        color: faker.vehicle.color(),
        licensePlate: faker.lorem.words(),
        brand: faker.internet.userAgent(),
        model: faker.vehicle.model(),
        type: 'car',
        year: faker.number.int(),
        registrationDocumentUrl: faker.internet.url(),
      },
      ...override,
    },
    id,
  )

  return deliveryman
}
