import { IGenreList } from '../../interfaces'
import { GenreActionType } from '../action-types'
import { GenreAction } from '../actions'

type IState = {
    loading: boolean
    genres: IGenreList | []
    error: string | null
}

const initialState = {
    loading: false,
    genres: [],
    error: null,
}

const findGenresReducer = (
    state: IState = initialState,
    action: GenreAction
): IState => {
    switch (action.type) {
        case GenreActionType.GET_ALL_GENRES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GenreActionType.GET_ALL_GENRES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                genres: action.payload,
            }
        case GenreActionType.GET_ALL_GENRES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export default findGenresReducer
