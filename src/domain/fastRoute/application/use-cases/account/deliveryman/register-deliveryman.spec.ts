import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repositort'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { CreateDeliverymanUseCase } from './create-deliveryman'
import { CreateUserUseCase } from '../create-user'
import { RegisterDeliverymanUseCase } from './register-deliveryman'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let createUsersUseCase: CreateUserUseCase
let createDeliverymanUseCase: CreateDeliverymanUseCase
let sut: RegisterDeliverymanUseCase

describe('Register DeliveryMan', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    createDeliverymanUseCase = new CreateDeliverymanUseCase(
      inMemoryDeliverymanRepository,
    )
    createUsersUseCase = new CreateUserUseCase(inMemoryUsersRepository)

    sut = new RegisterDeliverymanUseCase(
      createUsersUseCase,
      createDeliverymanUseCase,
    )
  })

  it('Should be able to register an deliveryman', async () => {
    const result = await sut.execute({
      name: 'JonhDoe',
      cpf: '123.456.789-11',
      email: 'jonhDoe@example.com',
      password: '123456',
      phone: '(01) 11111-1111',
      driveLicense: '12345',
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
    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })
})
