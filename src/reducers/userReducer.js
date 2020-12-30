import { userConstants } from "../actions/constants";

const initialState = {
  users: [],
  conversations: [],
  loadingUser: true,
  loadingChat: true,
  lastestDoc: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
      state = {
        ...state,
        loadingUser: true,
      };
      return state;
    case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
      state = {
        ...state,
        loadingUser: false,
        users: action.payload.users,
      };
      return state;
    case `${userConstants.GET_REALTIME_MESSAGE}_REQUEST`:
      state = {
        ...state,
        loadingChat: true,
      };
      return state;
    case `${userConstants.GET_REALTIME_MESSAGE}_SUCCESS`:
      state = {
        ...state,
        loadingChat: false,
        conversations: action.payload.conversations.reverse(),
        lastestDoc: action.payload.lastestDoc,
      };
      return state;
    case `${userConstants.GET_LOADMORE_MESSAGE}_REQUEST`:
      state = {
        ...state,
        loadingChat: true,
      };
      return state;
    case `${userConstants.GET_LOADMORE_MESSAGE}_SUCCESS`:
      debugger;
      state = {
        ...state,
        loadingChat: false,
        conversations: [
          ...action.payload.conversations,
          ...state.conversations,
        ],
        lastestDoc: action.payload.lastestDoc,
      };
      return state;
    case `${userConstants.GET_LOADMORE_MESSAGE}_FAILURE`:
      debugger;
      state = {
        ...state,
      };
      return state;
    default:
      return state;
  }
};
