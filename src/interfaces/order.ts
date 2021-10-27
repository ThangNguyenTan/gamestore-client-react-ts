import { IFindGameItem } from './game'

export type IOrder = {
    id?: number
    GameInstance: IFindGameItem
    createdAt?: string
    updatedAt?: string
}

export type IOrderList = IOrder[]
