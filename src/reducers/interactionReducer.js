import { interactionConstants } from "../actions/constants";

const initialState = {
    interactions : [],
    isLoading : false,
    error : null,
    notify : null,
}
export default (state = initialState,action)=>{
    switch (action.type) {
        case `${interactionConstants.UPDATE_LIKE}_REQUEST`:
            // state = {
            //     ...state,
            //     interactions : action.payload.interactions,
            //     isLoading:true,
            // }
            return state;
        case `${interactionConstants.GET_REALTIME_INTERACTIONS}_REQUEST`:
            state = {
                ...state,
                isLoading:true,
            };
            return state;
        case `${interactionConstants.GET_REALTIME_INTERACTIONS}_SUCCESS`:
            state = {
                ...state,
                isLoading:false,
                interactions : action.payload.interactions
            }
            return state;
        default:
            return state;
    }
}