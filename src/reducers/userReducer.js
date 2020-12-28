import { userConstants } from "../actions/constants";

const initialState = {
    users : [],
    conversations : [],
    loadingUser : true,
    loadingChat: true,
}
export default (state=initialState,action)=>{
    switch (action.type) {
        case  `${userConstants.GET_REALTIME_USERS}_REQUEST`:
            state = {
                ...state,
                loadingUser:true,
            }
            break;
        case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
            state = {
                ...state,
                loadingUser:false,
                users:action.payload.users
            }
            break;
        case `${userConstants.GET_REALTIME_MESSAGE}_REQUEST`:
            state = {
                ...state,
                loadingChat:true,
            }
            break;
        case `${userConstants.GET_REALTIME_MESSAGE}_SUCCESS`:
            debugger
            state = {
                ...state,
                loadingChat : false,
                conversations:action.payload.conversations
            }
            break;
        default:
            break;
    }
    return state;
}