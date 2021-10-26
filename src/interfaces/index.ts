export type IUserSignIn = {
    email: string
    password: string
}

export type IUserSignUp = {
    username: string
    email: string
    password: string
}

export type IUser = {
    id?: number
    username: string
    email?: string
    password: string
    createdAt?: string
    updatedAt?: string
}

export type IUserAuth = {
    user: IUser
    token: string
}

export type IGenre = {
    id?: number
    genreName: string
    createdAt?: string
    updatedAt?: string
}

export type IGenreList = IGenre[]

export type IFeature = {
    id?: number
    featureName: string
    createdAt?: string
    updatedAt?: string
}

export type IFeatureList = IFeature[]

export type IGame = {
    id?: number
    gameName: string
    gamePrice: number
    gamePoster: string
    gameTrailer: string
    gameDescription: string
    releaseDate: string
    createdAt?: string
    updatedAt?: string
}

export interface IFindGameItem extends IGame {
    FeatureInstance: IFeature
    GenreInstance: IGenre
    DeveloperInstance: IDeveloper
    PublisherInstance: IPublisher
}

export type IFindGameList = IFindGameItem[]

export interface ICartItem extends IFindGameItem {
    quantity: number
    subTotal: number
}

export type ICartList = ICartItem[]

export type IDeveloper = {
    id?: number
    developerName: string
    createdAt?: string
    updatedAt?: string
}

export type IPublisher = {
    id?: number
    publisherName: string
    createdAt?: string
    updatedAt?: string
}

export type IOrder = {
    id?: number
    GameInstance: IGame
    createdAt?: string
    updatedAt?: string
}

export type IOrderList = IOrder[]

declare global {
    interface Window {
        paypal: boolean
    }
}
