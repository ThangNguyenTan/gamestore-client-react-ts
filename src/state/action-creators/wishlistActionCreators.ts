import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { WishlistActionType } from '../action-types'
import { WishlistAction } from '../actions'
import { RootState } from '../reducers'
import { IFindGameItem, IWishlistList, IWishlistItem } from '../../interfaces'
import {
    createAuthorizedRequestHeader,
    getErrorMessageFromResponse,
    mainWishlistURL,
} from '../../utils'

export const checkInWishlist = (gameId: number) => {
    return async (
        dispatch: Dispatch<WishlistAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: WishlistActionType.CHECK_IN_WISHLIST_REQUEST,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            const res: AxiosResponse<IWishlistItem> = await axios.get(
                `${mainWishlistURL()}/check/${gameId}`,
                {
                    headers: {
                        Authorization: createAuthorizedRequestHeader(
                            currentUser
                        ),
                    },
                }
            )
            dispatch({
                type: WishlistActionType.CHECK_IN_WISHLIST_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: WishlistActionType.CHECK_IN_WISHLIST_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}

export const getAllWishlist = () => {
    return async (
        dispatch: Dispatch<WishlistAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: WishlistActionType.GET_ALL_WISHLIST_REQUEST,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            const res: AxiosResponse<IWishlistList> = await axios.get(
                `${mainWishlistURL()}`,
                {
                    headers: {
                        Authorization: createAuthorizedRequestHeader(
                            currentUser
                        ),
                    },
                }
            )
            dispatch({
                type: WishlistActionType.GET_ALL_WISHLIST_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: WishlistActionType.GET_ALL_WISHLIST_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}

export const createWishlist = (game: IFindGameItem) => {
    return async (
        dispatch: Dispatch<WishlistAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: WishlistActionType.CREATE_WISHLIST_REQUEST,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            const res: AxiosResponse<IWishlistItem> = await axios.post(
                `${mainWishlistURL()}`,
                {
                    gameItem: game,
                },
                {
                    headers: {
                        Authorization: createAuthorizedRequestHeader(
                            currentUser
                        ),
                    },
                }
            )
            dispatch({
                type: WishlistActionType.CREATE_WISHLIST_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: WishlistActionType.CREATE_WISHLIST_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}

export const removeWishlist = (wishlistId: number) => {
    return async (
        dispatch: Dispatch<WishlistAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: WishlistActionType.DELETE_WISHLIST_REQUEST,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            const res: AxiosResponse<IWishlistItem> = await axios.delete(
                `${mainWishlistURL()}/${wishlistId}`,
                {
                    headers: {
                        Authorization: createAuthorizedRequestHeader(
                            currentUser
                        ),
                    },
                }
            )
            dispatch({
                type: WishlistActionType.DELETE_WISHLIST_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: WishlistActionType.DELETE_WISHLIST_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}
