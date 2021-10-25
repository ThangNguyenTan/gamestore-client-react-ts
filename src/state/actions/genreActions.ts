import { GenreActionType } from '../action-types'
import { IGenreList } from '../../interfaces'

interface GetAllGenresRequestAction {
    type: GenreActionType.GET_ALL_GENRES_REQUEST
}
interface GetAllGenresSuccessAction {
    type: GenreActionType.GET_ALL_GENRES_SUCCESS
    payload: IGenreList
}
interface GetAllGenresFailAction {
    type: GenreActionType.GET_ALL_GENRES_FAIL
    payload: string
}

export type GenreAction =
    | GetAllGenresRequestAction
    | GetAllGenresSuccessAction
    | GetAllGenresFailAction
