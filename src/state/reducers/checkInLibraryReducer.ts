import { OrderActionType } from '../action-types'
import { OrderAction } from '../actions'

type IState = {
    loading: boolean
    isInLibrary: boolean
    error: string | null
}

const initialState = {
    loading: false,
    isInLibrary: false,
    error: null,
}

const checkInLibraryReducer = (
    state: IState = initialState,
    action: OrderAction
): IState => {
    switch (action.type) {
        case OrderActionType.CHECK_IN_LIBRARY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case OrderActionType.CHECK_IN_LIBRARY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                isInLibrary: action.payload,
            }
        case OrderActionType.CHECK_IN_LIBRARY_FAIL:
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
