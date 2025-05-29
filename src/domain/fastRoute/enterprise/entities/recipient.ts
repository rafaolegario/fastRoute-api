import { Entity } from '@/core/entities/Entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type address = {
  street: string
  number: string
  city: string
  state: string
  zipCode: string
  latitude?: number
  longitude?: number
  complement?: string
}

export interface RecipientProps {
  name: string
  cpf: string
  phone?: string
  email?: string
  address: address
  createdAt: Date
}

export class Recipient extends Entity<RecipientProps> {
  static create(props: RecipientProps, id: UniqueEntityID) {
    const recipient = new Recipient(
      {
        ...props,
      },
      id,
    )

    return recipient
  }

  get name() {
    return this.props.name
  }

  get phone() {
    return this.props.phone
  }

  get cpf() {
    return this.props.cpf
  }

  get email() {
    return this.props.email
  }

  get createdAt() {
    return this.props.createdAt
  }
}
