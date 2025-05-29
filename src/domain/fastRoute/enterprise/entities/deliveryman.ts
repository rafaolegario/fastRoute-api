import { Entity } from "@/core/entities/Entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

type currentLocation = {
  latitude: number
  longitude: number
}

export interface DeliverymanProps {
  userId: UniqueEntityID
  currentLocation?: currentLocation
  status: boolean
  createdAt: Date
}

export class Deliveryman extends Entity<DeliverymanProps>{
  static create(props: DeliverymanProps, id: UniqueEntityID){
    const deliveryman = new Deliveryman({
      ...props
    }, id)

    return deliveryman 
  }

  get userId(){
    return this.props.userId
  }

  get latitude(){
    return this.props.currentLocation?.latitude
  }

  get longitude(){
    return this.props.currentLocation?.longitude
  }

  get createdAt(){
    return this.props.createdAt
  }
  
}