import { Role, User } from '@/domain/fastRoute/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'

interface CreateUserRequest {
  name: string
  phone: string
  cpf: string
  email: string
  password: string
  role: Role[]
}

interface CreateUserResponse {
  user: User
}

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
      throw new Error('User already exists')
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

    return { user }
  }
}
