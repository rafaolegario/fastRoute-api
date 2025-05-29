import { UsersRepository } from '@/domain/fastRoute/application/repositories/users-repository'
import { User } from '@/domain/fastRoute/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(user: User) {
    this.items.push(user)
  }

  async findById(userId: string) {
    const User = this.items.find((user) => user.id.toString() === userId)

    if (!User) {
      return null
    }

    return User
  }

  async findByCpf(cpf: string) {
    const User = this.items.find((user) => user.cpf === cpf)

    if (!User) {
      return null
    }

    return User
  }
}
