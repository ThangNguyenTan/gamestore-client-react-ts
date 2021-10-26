import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { OrderActionType } from '../action-types'
import { OrderAction } from '../actions'
import { RootState } from '../reducers'
import { IFindGameItem, IOrderList } from '../../interfaces'
import {
    createAuthorizedRequestHeader,
    getErrorMessageFromResponse,
} from '../../utils'

export const checkInLibrary = (gameId: number) => {
    return async (
        dispatch: Dispatch<OrderAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: OrderActionType.CHECK_IN_LIBRARY_REQUEST,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            if (!currentUser) {
                dispatch({
                    type: OrderActionType.CHECK_IN_LIBRARY_SUCCESS,
                    payload: false,
                })
                return
            }

            const res: AxiosResponse<boolean> = await axios.get(
                `${process.env.REACT_APP_API_URL}/orders/check/${gameId}`,
                {
                    headers: {
                        Authorization: createAuthorizedRequestHeader(
                            currentUser
                        ),
                    },
                }
            )
            dispatch({
                type: OrderActionType.CHECK_IN_LIBRARY_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: OrderActionType.CHECK_IN_LIBRARY_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}

export const getLibrary = () => {
    return async (
        dispatch: Dispatch<OrderAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: OrderActionType.GET_LIBARY_REQUEST,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            const res: AxiosResponse<IOrderList> = await axios.get(
                `${process.env.REACT_APP_API_URL}/orders`,
                {
                    headers: {
                        Authorization: createAuthorizedRequestHeader(
                            currentUser
                        ),
                    },
                }
            )
            dispatch({
                type: OrderActionType.GET_LIBARY_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: OrderActionType.GET_LIBARY_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}

export const payOrder = (game: IFindGameItem, paymentResult: any) => {
    return async (
        dispatch: Dispatch<OrderAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: OrderActionType.ORDER_PAY_RESET,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            const res: AxiosResponse<boolean> = await axios.post(
                `${process.env.REACT_APP_API_URL}/orders/pay`,
                {
                    gameItem: game,
                    paymentResult,
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
                type: OrderActionType.ORDER_PAY_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: OrderActionType.ORDER_PAY_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}

export const clearPayOrder = () => {
    return async (dispatch: Dispatch<OrderAction>): Promise<void> => {
        dispatch({
            type: OrderActionType.ORDER_PAY_RESET,
        })
    }
}
