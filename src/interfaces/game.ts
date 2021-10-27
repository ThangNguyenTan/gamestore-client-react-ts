import { IFeature } from './feature'
import { IGenre } from './genre'
import { IDeveloper } from './developer'
import { IPublisher } from './publisher'

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
