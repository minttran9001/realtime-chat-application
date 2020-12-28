import { userConstants } from "./constants";
import firebase from "../database/firebase";
export const getRealTimeUser = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });
    const db = firebase.firestore();

    const unsubscribe = db
      .collection("users")
      .where("uid", "!=", uid)
      .onSnapshot(function (snap) {
        const users = [];
        snap.forEach((doc) => {
          if (doc.data().length != users.length) {
            users.push(doc.data());
          }
        });
        dispatch({
          type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
          payload: { users },
        });
      });
    return unsubscribe;
  };
};
export const updateMessage = (msgObj) => {
  return async (dispatch) => {
    debugger;
    dispatch({ type: `${userConstants.UPDATE_MESSAGE}_REQUEST` });
    const db = firebase.firestore();
    db.collection("conversations")
      .add({
        ...msgObj,
        isView: false,
        createAt: new Date(),
      })
      .then((data) => {
        dispatch({ type: `${userConstants.UPDATE_MESSAGE}_SUCCESS` });
      })
      .catch((error) => {
        dispatch({
          type: `${userConstants.UPDATE_MESSAGE}_REQUEST`,
          payload: { error: error.message },
        });
      });
  };
};

export const getRealTimeConversations = ({ uid_1, uid_2 }) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_MESSAGE}_REQUEST` });
    const db = firebase.firestore();
    
  
    db.collection("conversations")
      .where("user_uid_1", "in", [uid_2, uid_1])
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 == uid_1 &&
              doc.data().user_uid_2 == uid_2) ||
            (doc.data().user_uid_1 == uid_2 && doc.data().user_uid_2 == uid_1)
          ) {
            conversations.push(doc.data());
          }
          
        });
        dispatch({
          type: `${userConstants.GET_REALTIME_MESSAGE}_SUCCESS`,
          payload : {conversations},
        });
      });
  };
};
