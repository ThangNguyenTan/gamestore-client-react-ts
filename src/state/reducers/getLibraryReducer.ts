import { OrderActionType } from '../action-types'
import { OrderAction } from '../actions'
import { IOrderList } from '../../interfaces'

type IState = {
    loading: boolean
    orders: IOrderList | []
    error: string | null
}

const initialState = {
    loading: false,
    orders: [],
    error: null,
}

const getLibraryReducer = (
    state: IState = initialState,
    action: OrderAction
): IState => {
    switch (action.type) {
        case OrderActionType.GET_LIBARY_REQUEST:
            return { ...state, loading: true }
        case OrderActionType.GET_LIBARY_SUCCESS:
            return { ...state, loading: false, orders: action.payload }
        case OrderActionType.GET_LIBARY_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default getLibraryReducer
