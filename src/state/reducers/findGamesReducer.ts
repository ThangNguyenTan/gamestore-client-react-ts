import jwpaginate from 'jw-paginate'
import { IFindGameList } from '../../interfaces'
import { GameActionType } from '../action-types'
import { GameAction } from '../actions'

type IState = {
    loading: boolean
    games: IFindGameList | []
    error: string | null
    gamePageObject: any
}

const initialState = {
    loading: false,
    games: [],
    error: null,
    gamePageObject: null,
}

const findGamesReducer = (
    state: IState = initialState,
    action: GameAction
): IState => {
    switch (action.type) {
        case GameActionType.FIND_GAMES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GameActionType.FIND_GAMES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                games: action.payload.games,
                gamePageObject: jwpaginate(
                    action.payload.totalItems,
                    action.payload.currentPage,
                    action.payload.pageSize,
                    6
                ),
            }
        case GameActionType.FIND_GAMES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export default findGamesReducer
