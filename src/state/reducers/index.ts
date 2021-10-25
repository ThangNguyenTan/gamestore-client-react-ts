import { combineReducers } from 'redux'
import bankReducer from './bankReducer'
import findTodosReducer from './findTodosReducer'
import findGenresReducer from './findGenresReducer'
import findFeaturesReducer from './findFeaturesReducer'
import findGamesReducer from './findGamesReducer'
import createTodoReducer from './createTodoReducer'
import authReducer from './authReducer'

const reducers = combineReducers({
    authReducer,
    bankReducer,
    findTodosReducer,
    createTodoReducer,
    findGenresReducer,
    findFeaturesReducer,
    findGamesReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
