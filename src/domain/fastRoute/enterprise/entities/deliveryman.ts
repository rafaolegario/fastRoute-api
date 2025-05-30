import { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/Entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type currentLocation = {
  latitude: number
  longitude: number
}

export type Vehicle = {
  licensePlate: string
  type: 'motorcycle' | 'car' | 'truck' | 'van'
  model: string
  brand: string
  color: string
  year: number
  registrationDocumentUrl?: string
}

export interface DeliverymanProps {
  userId: UniqueEntityID
  driveLicense: string
  vehicle: Vehicle
  currentLocation?: currentLocation
  status: 'ONLINE' | 'OFFLINE'
  createdAt: Date
}

export class Deliveryman extends Entity<DeliverymanProps> {
  static create(
    props: Optional<DeliverymanProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const deliveryman = new Deliveryman(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        status: props.status ?? 'OFFLINE',
      },
      id,
    )

    return deliveryman
  }

  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get vehicle() {
    return this.props.vehicle
  }

  get driveLicense() {
    return this.props.driveLicense
  }

  get status() {
    return this.props.status
  }

  toggleStatus(status: 'ONLINE' | 'OFFLINE') {
    this.props.status = status
  }

  getLocation() {
    return this.props.currentLocation
  }

  setLocation(latitude: number, longitude: number) {
    this.props.currentLocation = { latitude, longitude }
  }
}
