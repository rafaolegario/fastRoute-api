import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/fastRoute/enterprise/entities/user'

export function MakeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      role: ['ADMIN'],
      ...override,
    },
    id,
  )

  return user
}
