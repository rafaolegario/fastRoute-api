import { Role, User } from '@/domain/fastRoute/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Either, left, right } from '@/core/repositories/either'
import { ResourceAlreadyExists } from '../../errors/resource-already-exists-error'

interface CreateUserRequest {
  name: string
  phone: string
  cpf: string
  email: string
  password: string
  role: Role[]
}

type CreateUserResponse = Either<
  ResourceAlreadyExists,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
    phone,
    role,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.usersRepository.findByCpf(cpf)

    if (userAlreadyExists) {
      return left(new ResourceAlreadyExists('User', `Cpf:${cpf}`))
    }

    const passwordHash = password + '-hash'

    const user = User.create({
      name,
      cpf,
      email,
      password: passwordHash,
      phone,
      role,
    })

    await this.usersRepository.create(user)
    return right({ user })
  }
}
