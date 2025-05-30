import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repositort'
import { CreateDeliverymanUseCase } from './create-deliveryman'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { MakeUser } from 'test/factories/make-user'
import { ResourceAlreadyExists } from '../../../errors/resource-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let sut: CreateDeliverymanUseCase

describe('Create DeliveryMan', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    sut = new CreateDeliverymanUseCase(inMemoryDeliverymanRepository)
  })

  it('Should be able to create an deliveryman', async () => {
    const user = MakeUser({
      role: ['DELIVERYMAN'],
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      driveLicense: 'drive-example',
      vehicle: {
        licensePlate: 'ABC-1234',
        type: 'motorcycle',
        model: 'xx 160 xxxx',
        brand: 'xxxxx',
        color: 'black',
        year: 2022,
        registrationDocumentUrl: 'https://example.com/docs/vehicle.pdf',
      },
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliverymanRepository.items).toHaveLength(1)
  })

  it('should not be possible to create a deliveryman if a deliveryman already exists.', async () => {
    const user = MakeUser({
      role: ['DELIVERYMAN'],
    })

    inMemoryUsersRepository.items.push(user)

    const firstResult = await sut.execute({
      userId: user.id.toString(),
      driveLicense: 'drive-example',
      vehicle: {
        licensePlate: 'ABC-1234',
        type: 'motorcycle',
        model: 'xx 160 xxxx',
        brand: 'xxxxx',
        color: 'black',
        year: 2022,
        registrationDocumentUrl: 'https://example.com/docs/vehicle.pdf',
      },
    })

    expect(firstResult.isRight()).toBe(true)

    const secondResult = await sut.execute({
      userId: user.id.toString(),
      driveLicense: 'drive-example',
      vehicle: {
        licensePlate: 'ABC-1234',
        type: 'motorcycle',
        model: 'xx 160 xxxx',
        brand: 'xxxxx',
        color: 'black',
        year: 2022,
        registrationDocumentUrl: 'https://example.com/docs/vehicle.pdf',
      },
    })

    expect(secondResult.isLeft()).toBe(true)
    expect(secondResult.value).toBeInstanceOf(ResourceAlreadyExists)
  })
})
