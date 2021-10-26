import { IOrderList } from '../../interfaces'
import { OrderActionType } from '../action-types'

interface GetLibraryRequestAction {
    type: OrderActionType.GET_LIBARY_REQUEST
}
interface GetLibrarySuccessAction {
    type: OrderActionType.GET_LIBARY_SUCCESS
    payload: IOrderList
}
interface GetLibraryFailAction {
    type: OrderActionType.GET_LIBARY_FAIL
    payload: string
}

interface CheckInLibraryRequestAction {
    type: OrderActionType.CHECK_IN_LIBRARY_REQUEST
}
interface CheckInLibrarySuccessAction {
    type: OrderActionType.CHECK_IN_LIBRARY_SUCCESS
    payload: boolean
}
interface CheckInLibraryFailAction {
    type: OrderActionType.CHECK_IN_LIBRARY_FAIL
    payload: string
}

interface PayOrderRequestAction {
    type: OrderActionType.ORDER_PAY_REQUEST
}
interface PayOrderSuccessAction {
    type: OrderActionType.ORDER_PAY_SUCCESS
    payload: boolean
}
interface PayOrderFailAction {
    type: OrderActionType.ORDER_PAY_FAIL
    payload: string
}

interface PayOrderResetAction {
    type: OrderActionType.ORDER_PAY_RESET
}

export type OrderAction =
    | PayOrderRequestAction
    | PayOrderSuccessAction
    | PayOrderFailAction
    | PayOrderResetAction
    | GetLibraryRequestAction
    | GetLibrarySuccessAction
    | GetLibraryFailAction
    | CheckInLibraryRequestAction
    | CheckInLibrarySuccessAction
    | CheckInLibraryFailAction
