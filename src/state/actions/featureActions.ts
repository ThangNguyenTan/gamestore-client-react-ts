import { FeatureActionType } from '../action-types'
import { IFeatureList } from '../../interfaces'

interface GetAllFeaturesRequestAction {
    type: FeatureActionType.GET_ALL_FEATURES_REQUEST
}
interface GetAllFeaturesSuccessAction {
    type: FeatureActionType.GET_ALL_FEATURES_SUCCESS
    payload: IFeatureList
}
interface GetAllFeaturesFailAction {
    type: FeatureActionType.GET_ALL_FEATURES_FAIL
    payload: string
}

export type FeatureAction =
    | GetAllFeaturesRequestAction
    | GetAllFeaturesSuccessAction
    | GetAllFeaturesFailAction
