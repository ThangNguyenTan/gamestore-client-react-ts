import { IUserAuth } from '../interfaces'
import { mainGamesURL } from './apiHelpers'

export * from './apiHelpers'
export * from './toastCreator'

export const getErrorMessageFromResponse = (error: any): string =>
    error.response && error.response.data.message
        ? error.response.data.message
        : error.message

export const createAuthorizedRequestHeader = (
    userData: IUserAuth | null
): string => {
    if (!userData) {
        return ''
    }
    return `Bearer ${userData.token}`
}

export const generateFindGamesURL = (
    name: string,
    genres: number[],
    features: number[],
    sortBy: string,
    sortVariation = 'DESC',
    currentPage: number
): string => {
    let url = `${mainGamesURL()}/find?pageSize=8`

    if (name) {
        url += `&name=${name}`
    }

    if (genres.length > 0) {
        url += `&genres=${genres.join(',')}`
    }

    if (features.length > 0) {
        url += `&features=${features.join(',')}`
    }

    if (sortBy) {
        url += `&sortBy=${sortBy}&sortVariation=${sortVariation}`
    }

    if (currentPage) {
        url += `&page=${currentPage}`
    }

    return url
}
