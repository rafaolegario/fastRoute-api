import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repositort'
import { CreateDeliverymanUseCase } from './create-deliveryman'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { MakeUser } from 'test/factories/make-user'

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

    await sut.execute({
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

    expect(inMemoryDeliverymanRepository.items).toHaveLength(1)
  })

  it('should not be possible to create a deliveryman if a deliveryman already exists.', async () => {
    const user = MakeUser({
      role: ['DELIVERYMAN'],
    })

    inMemoryUsersRepository.items.push(user)

    await sut.execute({
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

    await expect(() =>
      sut.execute({
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
      }),
    ).rejects.toThrowError('Deliveryman already exists')
  })
})
