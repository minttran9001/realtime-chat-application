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
    dispatch({ type: `${userConstants.UPDATE_MESSAGE}_REQUEST` });
    const db = firebase.firestore();
    db.collection("conversations")
      .add({
        ...msgObj,
        type:'text',
        isView: false,
        createdAt: new Date(),
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
export const setSeenMessage = ({ uid_1, uid_2 }) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.SET_SEEN_MESSAGE}_REQUEST` });
    const db = firebase.firestore();
    db.collection("conversations")
      .where("user_uid_1", "==", uid_2)
      .where("user_uid_2", "==", uid_1)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            isView: true,
          });
        });
      });
  };
};
export const getLoadMoreConversations = ({ uid_1, uid_2, lastestDoc }) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_LOADMORE_MESSAGE}_REQUEST` });
    const db = firebase.firestore();

    const ref = db
      .collection("conversations")
      .orderBy("createdAt", "desc")
      .where("user_uid_1", "in", [uid_2, uid_1])
      .startAfter(lastestDoc || 0)
      .limit(10);
    const data = await ref.get();
    lastestDoc = data.docs[data.docs.length - 1];
    const conversations = [];
    data.docs.forEach((doc) => {
      conversations.push(doc.data());
    });
    if (conversations !== []) {
      dispatch({
        type: `${userConstants.GET_LOADMORE_MESSAGE}_SUCCESS`,
        payload: { conversations: conversations.reverse(), lastestDoc },
      });
    } else {
      dispatch({
        type: `${userConstants.GET_LOADMORE_MESSAGE}_FAILURE`,
        payload: { error: "END" },
      });
    }
  };
};
export const getRealTimeConversations = ({ uid_1, uid_2, type }) => {
  return async (dispatch) => {
      dispatch({ type: `${userConstants.GET_REALTIME_MESSAGE}_REQUEST` });
    const db = firebase.firestore();
    const ref = db
      .collection("conversations")
      .orderBy("createdAt", "desc")
      .where("user_uid_1", "in", [uid_2, uid_1]);
    const data = await ref.get();
    const lastestDoc = data.docs[data.docs.length - 1];
    db.collection("conversations")
      .orderBy("createdAt", "desc")
      .where("user_uid_1","in",[uid_1,uid_2])
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
          payload: { conversations: conversations.reverse(), lastestDoc },
        });
      });
  };
};
