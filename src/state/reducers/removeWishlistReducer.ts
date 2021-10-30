import { WishlistActionType } from '../action-types'
import { WishlistAction } from '../actions'
import { IWishlistItem } from '../../interfaces'

type IState = {
    loading: boolean
    wishlist: IWishlistItem | null
    error: string | null
}

const initialState = {
    loading: false,
    wishlist: null,
    error: null,
}

const createWishlistReducer = (
    state: IState = initialState,
    action: WishlistAction
): IState => {
    switch (action.type) {
        case WishlistActionType.DELETE_WISHLIST_REQUEST:
            return { ...state, loading: true }
        case WishlistActionType.DELETE_WISHLIST_SUCCESS:
            return { ...state, loading: false, wishlist: action.payload }
        case WishlistActionType.DELETE_WISHLIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default createWishlistReducer
