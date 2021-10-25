import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { FeatureActionType } from '../action-types'
import { FeatureAction } from '../actions'
import {
    mainFeaturesURL,
    getErrorMessageFromResponse,
    createAuthorizedRequestHeader,
} from '../../utils'
import { IFeatureList } from '../../interfaces'
import { RootState } from '../reducers'

export const findFeatures = () => {
    return async (
        dispatch: Dispatch<FeatureAction>,
        getState: () => RootState
    ): Promise<void> => {
        dispatch({
            type: FeatureActionType.GET_ALL_FEATURES_REQUEST,
        })

        try {
            const { authReducer } = getState()
            const { currentUser } = authReducer

            const res: AxiosResponse<IFeatureList> = await axios.get(
                `${mainFeaturesURL()}`,
                {
                    headers: {
                        Authorization: createAuthorizedRequestHeader(
                            currentUser
                        ),
                    },
                }
            )
            dispatch({
                type: FeatureActionType.GET_ALL_FEATURES_SUCCESS,
                payload: res.data,
            })
        } catch (error: any) {
            dispatch({
                type: FeatureActionType.GET_ALL_FEATURES_FAIL,
                payload: getErrorMessageFromResponse(error),
            })
        }
    }
}
