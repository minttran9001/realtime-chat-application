import { userConstants } from "../actions/constants";

const initialState = {
  users: [],
  conversations: [],
  loadingUser: true,
  loadingChat: true,
  lastestDoc: {},
  loadingUserByKey: false,
  userByKey: {
    posts : []
  },
  error: "",
  notify : "",
  updating :false,
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
        conversations: action.payload.conversations,
        lastestDoc: action.payload.lastDoc,
      };
      return state;
    case `${userConstants.GET_LOADMORE_MESSAGE}_REQUEST`:
      state = {
        ...state,
        loadingChat: true,
      };
      return state;
    case `${userConstants.GET_LOADMORE_MESSAGE}_SUCCESS`:
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
      state = {
        ...state,
      };
      return state;
    case `${userConstants.GET_USER_PROFILE_BY_ID}_REQUEST`:
      state = {
        ...state,
        loadingUserByKey: true,
      };
      return state;
    case `${userConstants.GET_USER_PROFILE_BY_ID}_SUCCESS`:
      state = {
        ...state,
        loadingUserByKey: false,
        userByKey: action.payload.userByKey,
      };
      return state;
    case `${userConstants.GET_USER_PROFILE_BY_ID}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      return state;
      case `${userConstants.UPDATE_USER_AVATAR}_REQUEST`:
        state={
          ...state,
          updating:true
        }
        return state;
      case `${userConstants.UPDATE_USER_AVATAR}_SUCCESS`:
        state = {
          ...state,
          updating : false,
          notify: action.payload.notify,
          userByKey : {
            ...state.userByKey,
            avatarUrl: action.payload.avatarUrl,
          }
        };
        return state;
    default:
      return state;
  }
};
