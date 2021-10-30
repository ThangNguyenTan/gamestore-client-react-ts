import { IWishlistItem, IWishlistList } from '../../interfaces'
import { WishlistActionType } from '../action-types'

interface GetAllWishlistRequestAction {
    type: WishlistActionType.GET_ALL_WISHLIST_REQUEST
}
interface GetAllWishlistSuccessAction {
    type: WishlistActionType.GET_ALL_WISHLIST_SUCCESS
    payload: IWishlistList
}
interface GetAllWishlistFailAction {
    type: WishlistActionType.GET_ALL_WISHLIST_FAIL
    payload: string
}

interface CheckInWishlistRequestAction {
    type: WishlistActionType.CHECK_IN_WISHLIST_REQUEST
}
interface CheckInWishlistSuccessAction {
    type: WishlistActionType.CHECK_IN_WISHLIST_SUCCESS
    payload: IWishlistItem
}
interface CheckInWishlistFailAction {
    type: WishlistActionType.CHECK_IN_WISHLIST_FAIL
    payload: string
}

interface CreateWishlistRequestAction {
    type: WishlistActionType.CREATE_WISHLIST_REQUEST
}
interface CreateWishlistSuccessAction {
    type: WishlistActionType.CREATE_WISHLIST_SUCCESS
    payload: IWishlistItem
}
interface CreateWishlistFailAction {
    type: WishlistActionType.CREATE_WISHLIST_FAIL
    payload: string
}

interface DeleteWishlistRequestAction {
    type: WishlistActionType.DELETE_WISHLIST_REQUEST
}
interface DeleteWishlistSuccessAction {
    type: WishlistActionType.DELETE_WISHLIST_SUCCESS
    payload: IWishlistItem
}
interface DeleteWishlistFailAction {
    type: WishlistActionType.DELETE_WISHLIST_FAIL
    payload: string
}

export type WishlistAction =
    | GetAllWishlistRequestAction
    | GetAllWishlistSuccessAction
    | GetAllWishlistFailAction
    | CheckInWishlistRequestAction
    | CheckInWishlistSuccessAction
    | CheckInWishlistFailAction
    | CreateWishlistRequestAction
    | CreateWishlistSuccessAction
    | CreateWishlistFailAction
    | DeleteWishlistRequestAction
    | DeleteWishlistSuccessAction
    | DeleteWishlistFailAction
