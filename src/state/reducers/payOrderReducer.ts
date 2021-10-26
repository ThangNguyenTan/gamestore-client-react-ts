import { OrderActionType } from '../action-types'
import { OrderAction } from '../actions'

type IState = {
    loading: boolean
    success: boolean
    error: string | null
}

const initialState = {
    loading: false,
    success: false,
    error: null,
}

const payOrderReducer = (
    state: IState = initialState,
    action: OrderAction
): IState => {
    switch (action.type) {
        case OrderActionType.ORDER_PAY_REQUEST:
            return { ...state, loading: true }
        case OrderActionType.ORDER_PAY_SUCCESS:
            return { ...state, loading: false, success: true }
        case OrderActionType.ORDER_PAY_FAIL:
            return { ...state, loading: false, error: action.payload }
        case OrderActionType.ORDER_PAY_RESET:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default payOrderReducer
