import { IFindGameItem } from './game'

export type IWishlistItem = {
    id?: number
    GameInstance: IFindGameItem
    createdAt?: string
    updatedAt?: string
}

export type IWishlistList = IWishlistItem[]
