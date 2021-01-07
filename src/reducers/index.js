import {combineReducers} from 'redux'
import authReducer from './authReducer'
import userReducer from './userReducer'
import postReducer from './postReducer'
const myReducers = combineReducers({
    auth : authReducer,
    user : userReducer,
    post : postReducer,
})

export default myReducers