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
            break;
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
            break;
        case `${authConstants.USER_LOGIN}_FAILURE`:
            state = {
                ...state,
                authenticated:false,
                authenticating:false,
                error:action.payload.error
            }
            break;
        default:
            state = {...state};
            break;
    }
    return state;

}