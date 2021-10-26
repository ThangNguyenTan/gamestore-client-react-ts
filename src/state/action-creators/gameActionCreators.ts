import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { GameActionType } from '../action-types'
import { GameAction } from '../actions'
import {
    getErrorMessageFromResponse,
    createAuthorizedRequestHeader,
    generateFindGamesURL,
    singleGameURL,
} from '../../utils'
import { IFindGameList, IFindGameItem } from '../../interfaces'
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

export const getGame = (id: string | number) => {
    return async (
        dispatch: Dispatch<GameAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: GameActionType.GET_GAME_REQUEST,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            const res: AxiosResponse<IFindGameItem> = await axios.get(
                `${singleGameURL(id)}`,
                {
                    headers: {
                        Authorization: createAuthorizedRequestHeader(
                            currentUser
                        ),
                    },
                }
            )
            dispatch({
                type: GameActionType.GET_GAME_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: GameActionType.GET_GAME_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}
