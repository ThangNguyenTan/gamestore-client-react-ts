import { GameActionType } from '../action-types'
import { IFindGameList, IFindGameItem } from '../../interfaces'

interface GetAllGamesRequestAction {
    type: GameActionType.FIND_GAMES_REQUEST
}
interface GetAllGamesSuccessAction {
    type: GameActionType.FIND_GAMES_SUCCESS
    payload: {
        games: IFindGameList
        totalItems: number
        currentPage: number
        pageSize: number
    }
}
interface GetAllGamesFailAction {
    type: GameActionType.FIND_GAMES_FAIL
    payload: string
}

interface GetGameRequestAction {
    type: GameActionType.GET_GAME_REQUEST
}
interface GetGameSuccessAction {
    type: GameActionType.GET_GAME_SUCCESS
    payload: IFindGameItem
}
interface GetGameFailAction {
    type: GameActionType.GET_GAME_FAIL
    payload: string
}

export type GameAction =
    | GetAllGamesRequestAction
    | GetAllGamesSuccessAction
    | GetAllGamesFailAction
    | GetGameRequestAction
    | GetGameSuccessAction
    | GetGameFailAction
