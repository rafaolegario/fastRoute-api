import { Entity } from '@/core/entities/Entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type status = 'PENDING' | 'AVAILABLE' | 'IN_TRANSIT' | 'DELIVERED' | 'RETURNED'

export interface PackageProps {
  title: string
  recipientId: UniqueEntityID
  status: status
  deliverymanId?: UniqueEntityID
  photoProofUrl?: string
  availableAt?: Date
  pickedUpAt?: Date
  deliveredAt?: Date
  returnedAt?: Date
  createdAt: Date
}

export class Package extends Entity<PackageProps> {
  static create(props: PackageProps, id: UniqueEntityID) {
    const pack = new Package(
      {
        ...props,
      },
      id,
    )

    return pack
  }

  get title() {
    return this.props.title
  }

  set title(value) {
    this.props.title = value
  }

  get recipientId() {
    return this.props.recipientId
  }

  set recipientId(value) {
    this.props.recipientId = value
  }

  get deliverymanId() {
    return this.props.deliverymanId
  }

  set deliverymanId(value) {
    this.props.deliverymanId = value
  }

  get photoProofUrl() {
    return this.props.photoProofUrl
  }

  set photoProofUrl(value) {
    this.props.photoProofUrl = value
  }

  get availableAt() {
    return this.props.availableAt
  }

  set availableAt(value) {
    this.props.availableAt = value
  }

  get pickedUpAt() {
    return this.props.pickedUpAt
  }

  set pickedUpAt(value) {
    this.props.pickedUpAt = value
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  set deliveredAt(value) {
    this.props.deliveredAt = value
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  set returnedAt(value) {
    this.props.returnedAt = value
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(value) {
    this.props.createdAt = value
  }

  get status() {
    return this.props.status
  }

  set status(value) {
    this.props.status = value
  }
}
