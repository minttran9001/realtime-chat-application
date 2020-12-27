import {combineReducers} from 'redux'
import authReducer from './authReducer'

const myReducers = combineReducers({
    auth : authReducer
})

export default myReducers