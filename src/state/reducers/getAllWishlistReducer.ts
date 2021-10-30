import { WishlistActionType } from '../action-types'
import { WishlistAction } from '../actions'
import { IWishlistList } from '../../interfaces'

type IState = {
    loading: boolean
    wishlists: IWishlistList | []
    error: string | null
}

const initialState = {
    loading: false,
    wishlists: [],
    error: null,
}

const getAllWishlistReducer = (
    state: IState = initialState,
    action: WishlistAction
): IState => {
    switch (action.type) {
        case WishlistActionType.GET_ALL_WISHLIST_REQUEST:
            return { ...state, loading: true }
        case WishlistActionType.GET_ALL_WISHLIST_SUCCESS:
            return { ...state, loading: false, wishlists: action.payload }
        case WishlistActionType.GET_ALL_WISHLIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default getAllWishlistReducer
