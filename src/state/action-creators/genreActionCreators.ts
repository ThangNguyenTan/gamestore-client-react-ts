import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { GenreActionType } from '../action-types'
import { GenreAction } from '../actions'
import {
    mainGenresURL,
    getErrorMessageFromResponse,
    createAuthorizedRequestHeader,
} from '../../utils'
import { IGenreList } from '../../interfaces'
import { RootState } from '../reducers/index'

export const findGenres = () => {
    return async (
        dispatch: Dispatch<GenreAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: GenreActionType.GET_ALL_GENRES_REQUEST,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            const res: AxiosResponse<IGenreList> = await axios.get(
                `${mainGenresURL()}`,
                {
                    headers: {
                        Authorization: createAuthorizedRequestHeader(
                            currentUser
                        ),
                    },
                }
            )
            dispatch({
                type: GenreActionType.GET_ALL_GENRES_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: GenreActionType.GET_ALL_GENRES_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}
