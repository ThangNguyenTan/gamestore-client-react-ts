import { IWishlistItem } from '../../interfaces'
import { WishlistActionType } from '../action-types'
import { WishlistAction } from '../actions'

type IState = {
    loading: boolean
    isInWishlist: IWishlistItem | null
    error: string | null
}

const initialState = {
    loading: false,
    isInWishlist: null,
    error: null,
}

const checkInLibraryReducer = (
    state: IState = initialState,
    action: WishlistAction
): IState => {
    switch (action.type) {
        case WishlistActionType.CHECK_IN_WISHLIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case WishlistActionType.CHECK_IN_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                isInWishlist: action.payload,
            }
        case WishlistActionType.CHECK_IN_WISHLIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export default checkInLibraryReducer
