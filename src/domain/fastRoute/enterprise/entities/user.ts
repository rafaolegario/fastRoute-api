import { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/Entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type Role = 'ADMIN' | 'DELIVERYMAN'

export interface UserProps {
  name: string
  phone: string
  cpf: string
  email: string
  password: string
  role: Role[]
  createdAt: Date
}

export class User extends Entity<UserProps> {
  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }

  get name() {
    return this.props.name
  }

  get phone() {
    return this.props.phone
  }

  get role() {
    return this.props.role
  }

  get cpf() {
    return this.props.cpf
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  set name(name: string) {
    this.props.name = name
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  set email(email: string) {
    this.props.email = email
  }

  set password(password: string) {
    this.props.password = password
  }
}
