import { combineReducers } from 'redux'
import bankReducer from './bankReducer'
import findTodosReducer from './findTodosReducer'
import findGenresReducer from './findGenresReducer'
import findFeaturesReducer from './findFeaturesReducer'
import findGamesReducer from './findGamesReducer'
import getGameReducer from './getGameReducer'
import createTodoReducer from './createTodoReducer'
import authReducer from './authReducer'
import payOrderReducer from './payOrderReducer'
import getLibraryReducer from './getLibraryReducer'
import checkInLibraryReducer from './checkInLibraryReducer'
import getAllWishlistReducer from './getAllWishlistReducer'
import createWishlistReducer from './createWishlistReducer'
import removeWishlistReducer from './removeWishlistReducer'
import checkInWishlistReducer from './checkInWishlistReducer'

const reducers = combineReducers({
    authReducer,
    bankReducer,
    findTodosReducer,
    createTodoReducer,
    findGenresReducer,
    findFeaturesReducer,
    findGamesReducer,
    getGameReducer,
    payOrderReducer,
    getLibraryReducer,
    checkInLibraryReducer,
    getAllWishlistReducer,
    createWishlistReducer,
    removeWishlistReducer,
    checkInWishlistReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
