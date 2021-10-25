import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { GameActionType } from '../action-types'
import { GameAction } from '../actions'
import {
    getErrorMessageFromResponse,
    createAuthorizedRequestHeader,
    generateFindGamesURL,
} from '../../utils'
import { IFindGameList } from '../../interfaces'
import { RootState } from '../reducers'

export const findGames = (
    name: string,
    genres: number[],
    features: number[],
    sortBy: string,
    sortVariation = 'DESC',
    currentPage: number
) => {
    return async (
        dispatch: Dispatch<GameAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: GameActionType.FIND_GAMES_REQUEST,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            const res: AxiosResponse<{
                games: IFindGameList
                totalItems: number
                currentPage: number
                pageSize: number
            }> = await axios.get(
                `${generateFindGamesURL(
                    name,
                    genres,
                    features,
                    sortBy,
                    sortVariation,
                    currentPage
                )}`,
                {
                    headers: {
                        Authorization: createAuthorizedRequestHeader(
                            currentUser
                        ),
                    },
                }
            )
            dispatch({
                type: GameActionType.FIND_GAMES_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: GameActionType.FIND_GAMES_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}
