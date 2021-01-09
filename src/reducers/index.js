import {combineReducers} from 'redux'
import authReducer from './authReducer'
import userReducer from './userReducer'
import postReducer from './postReducer'
import interactionReducer from './interactionReducer'
const myReducers = combineReducers({
    auth : authReducer,
    user : userReducer,
    post : postReducer,
    interaction : interactionReducer,
})

export default myReducers