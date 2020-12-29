import { authConstants } from "../actions/constants"

const initialState = {
    firstName : '',
    lastName : '',
    uid : '',
    email : '',
    authenticating : false,
    authenticated : false,
    error : null
}

export default (state=initialState,action)=>{
    switch(action.type)
    {
        case `${authConstants.USER_LOGIN}_REQUEST`:
            state = {
                ...state,
                authenticating:true,
            }
            return state
        case `${authConstants.USER_LOGIN}_SUCCESS`:
            debugger
            state = {
                ...state,
                firstName : action.payload.user.firstName,
                lastName : action.payload.user.lastName,
                uid : action.payload.user.uid,
                email : action.payload.user.email,
                authenticated:true,
                authenticating:false,
                error:null,
            }
            return state

        case `${authConstants.USER_LOGIN}_FAILURE`:
            state = {
                ...state,
                authenticated:false,
                authenticating:false,
                error:action.payload.error
            }
            return state

        case `${authConstants.USER_LOGOUT}_REQUEST`:
            return state

        case `${authConstants.USER_LOGOUT}_SUCCESS`:
            state={
                ...initialState,

            }
            return state

        case `${authConstants.USER_LOGOUT}_FAILURE`:
            state={
                ...state,
                error:action.payload.error
            }
            return state

        default:
            return state
    }
}