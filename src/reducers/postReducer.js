import { postConstants } from "../actions/constants";

const initialState = {
  posts: [],
  posting: true,
  loadingPosts: true,
  error: null,
  posted: false,
  postByKey: {
    item: {},
    comments: [],
    loading: true,
    error: null,
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case `${postConstants.PUSH_POST}_REQUEST`:
      state = {
        ...state,
      };
      return state;
    case `${postConstants.PUSH_POST}_SUCCESS`:
      state = {
        ...state,
        posting: false,
        posted: true,
      };
      return state;
    case `${postConstants.PUSH_POST}_FAILURE`:
      state = {
        ...state,
        posted: false,
        posting: false,
        error: action.payload.error,
      };
    case `${postConstants.GET_REALTIME_POSTS}_REQUEST`:
      state = {
        ...state,
      };
      return state;
    case `${postConstants.GET_REALTIME_POSTS}_SUCCESS`:
      state = {
        ...state,
        loadingPosts: false,
        posts: action.payload.posts,
      };
      return state;
    case `${postConstants.GET_REALTIME_POSTS}_FAILURE`:
      state = {
        ...state,
        loadingPosts: false,
        error: action.payload.error,
      };
      return state;
    case `${postConstants.GET_POST_BY_KEY}_REQUEST`:
      state = {
        ...state,
      };
      return state;
    case `${postConstants.GET_POST_BY_KEY}_SUCCESS`:
      state = {
        ...state,
        postByKey: {
          ...state.postByKey,
          item: action.payload.postItem,
          comments: action.payload.comments,
          loading: false,
          error: null,
        },
      };
      return state;
    case `${postConstants.GET_POST_BY_KEY}_FAILURE`:
      state = {
        ...state,
        postByKey: {
          ...state.postByKey,
          loading: true,
          error: action.payload.error,
        },
      };
      return state;
    case `${postConstants.GET_REALTIME_POSTS_NEW_FEED}_REQUEST`:
      state = {
        ...state,
        loadingPosts: true,
      };
      return state;
    case `${postConstants.GET_REALTIME_POSTS_NEW_FEED}_SUCCESS`:
      debugger
      state = {
        ...state,
        loadingPosts: false,
        posts:action.payload.posts,
        error:'',
        
      };
      return state;
    case `${postConstants.GET_REALTIME_POSTS_NEW_FEED}_FAILURE`:
      state = {
        ...state,
        loadingPosts : false,
        error: action.payload.error,
      }
    default:
      return state;
  }
};
