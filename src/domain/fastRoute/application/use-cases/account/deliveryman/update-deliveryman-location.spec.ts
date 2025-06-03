import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repositort'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { MakeUser } from 'test/factories/make-user'
import { MakeDeliveryman } from 'test/factories/make-deliveryman'
import { UpdateDeliverymanLocationUseCase } from './update-deliveryman-location'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let sut: UpdateDeliverymanLocationUseCase

describe('Update DeliveryMan location', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    sut = new UpdateDeliverymanLocationUseCase(inMemoryDeliverymanRepository)
  })

  it('Should be able to update deliveryman location', async () => {
    const user = MakeUser({
      role: ['DELIVERYMAN'],
    })

    inMemoryUsersRepository.items.push(user)

    const deliveryman = MakeDeliveryman({ userId: user.id })

    inMemoryDeliverymanRepository.items.push(deliveryman)

    const latitude = -23.55052
    const longitude = -46.633308

    const result = await sut.execute({
      deliverymanId: deliveryman.id.toString(),
      currentLocation: {
        latitude,
        longitude,
      },
    })

    const updatedDeliveryman =
      inMemoryDeliverymanRepository.items[0].getLocation()

    expect(result.isRight()).toBe(true)
    expect(updatedDeliveryman).toEqual({
      latitude,
      longitude,
    })
  })
})
