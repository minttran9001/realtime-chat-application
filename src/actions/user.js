import { userConstants } from "./constants";
import firebase from "../database/firebase";
export const getRealTimeUser = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });
    const db = firebase.firestore();
    if (uid !== undefined) {
      db.collection("users")
        .where("uid", "!=", uid)
        .onSnapshot(function (snap) {
          const users = [];
          snap.forEach((doc) => {
            if (doc.data().length !== users.length) {
              users.push({key : doc.id,...doc.data()});
            }
          });
          dispatch({
            type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
            payload: { users },
          });
        });
    }
  };
};
export const updateMessage = ({ msgObj, type }) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.UPDATE_MESSAGE}_REQUEST` });
    const db = firebase.firestore();
    if (type !== "file") {
      db.collection("conversations")
        .add({
          ...msgObj,
          type: "text",
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
    } else {
      const ref = firebase.storage().ref();
      const name = new Date() + "-" + msgObj.file.name;
      const metaData = {
        contentType: msgObj.file.type,
      };
      const task = ref.child(name).put(msgObj.file, metaData);
      task.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          db.collection("conversations")
            .add({
              user_uid_1: msgObj.user_uid_1,
              user_uid_2: msgObj.user_uid_2,
              file: url,
              type: "file",
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
        });
      });
    }
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
export const getUserById = ({ uid }) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_USER_PROFILE_BY_ID}_REQUEST` });
    const db = firebase.firestore();
    const userRef = db.collection("users");
    const postRef = db.collection("posts");

    postRef.where("uid", "==", uid).onSnapshot(async (snapshot) => {
      const posts = [];
      snapshot.forEach((doc) => {
        posts.push({ key: doc.id, ...doc.data() });
      });
      const userByKey = (await userRef.doc(uid).get()).data();
      dispatch({
        type: `${userConstants.GET_USER_PROFILE_BY_ID}_SUCCESS`,
        payload: { userByKey: { ...userByKey, posts: posts } },
      });
    });
  };
};
export const updateUserAvatar = (uid, file) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.UPDATE_USER_AVATAR}_REQUEST` });
    const db = firebase.firestore();
    const ref = firebase.storage().ref();
    const name = new Date() + "-" + file.name;
    const metaData = file.type;
    const task = ref.child(name).put(file, metaData);
    var userLocal = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    task.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          const user = firebase.auth().currentUser;
          user.updateProfile({
            photoURL: url,
          });
          db.collection("users").doc(uid).update({
            avatarUrl: url,
          });

          userLocal = {
            ...userLocal.user,
            avatarUrl: url,
          };
        })

        .then(() => {
          dispatch({
            type: `${userConstants.UPDATE_USER_AVATAR}_SUCCESS`,
            payload: {
              notify: "Update successfully",
              avatarUrl: userLocal.avatarUrl,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: `${userConstants.UPDATE_USER_AVATAR}_FALURE`,
            payload: { error: err },
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
      .where("user_uid_1", "in", [uid_1, uid_2])
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 === uid_1 &&
              doc.data().user_uid_2 === uid_2) ||
            (doc.data().user_uid_1 === uid_2 && doc.data().user_uid_2 === uid_1)
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
