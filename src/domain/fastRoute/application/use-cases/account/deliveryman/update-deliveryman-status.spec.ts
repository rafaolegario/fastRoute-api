import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repositort'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { MakeUser } from 'test/factories/make-user'
import { MakeDeliveryman } from 'test/factories/make-deliveryman'
import { UpdateDeliverymanStatusUseCase } from './update-deliveryman-status'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let sut: UpdateDeliverymanStatusUseCase
describe('Update DeliveryMan status', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    sut = new UpdateDeliverymanStatusUseCase(inMemoryDeliverymanRepository)
  })

  it('Should be able to update deliveryman status', async () => {
    const user = MakeUser({
      role: ['DELIVERYMAN'],
    })

    inMemoryUsersRepository.items.push(user)

    const deliveryman = MakeDeliveryman({ userId: user.id })

    inMemoryDeliverymanRepository.items.push(deliveryman)

    const result = await sut.execute({
      deliverymanId: deliveryman.id.toString(),
      status: 'ONLINE',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliverymanRepository.items[0].status).toBe('ONLINE')

    await sut.execute({
      deliverymanId: deliveryman.id.toString(),
      status: 'OFFLINE',
    })

    expect(inMemoryDeliverymanRepository.items[0].status).toBe('OFFLINE')
  })
})
