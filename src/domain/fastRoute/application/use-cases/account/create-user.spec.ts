import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repositort'
import { CreateUserUseCase } from './create-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('Should be able to create an user', async () => {
    await sut.execute({
      name: 'JonhDoe',
      cpf: '123.456.789-11',
      email: 'jonhDoe@example.com',
      password: '123456',
      phone: '(01) 11111-1111',
      role: ['ADMIN'],
    })

    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })
})
