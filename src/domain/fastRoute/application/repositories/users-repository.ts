import { User } from '../../enterprise/entities/user'

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>
  abstract findById(userId: string): Promise<User | null>
  abstract findByCpf(cpf: string): Promise<User | null>
}
