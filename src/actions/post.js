import { postConstants } from "./constants";
import firebase from "../database/firebase";

export const pushPost = (post) => {
  return async (dispatch) => {
    dispatch({ type: `${postConstants.PUSH_POST}_REQUEST` });
    const db = firebase.firestore();
    const ref = firebase.storage().ref();
    const name = new Date() + "-" + post.file.name;
    const metaData = {
      contentType: post.file.type,
    };
    const task = ref.child(name).put(post.file, metaData);
    task.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        db.collection("posts")
          .add({
            file: url,
            createdAt: new Date(),
            status: post.status,
            uid: post.uid,
            liked: 0,
          })
          .then(() => {
            dispatch({ type: `${postConstants.PUSH_POST}_SUCCESS` });
          })
          .catch((err) => {
            dispatch({
              type: `${postConstants.PUSH_POST}_FAILURE`,
              payload: { error: err },
            });
          });
      });
    });
  };
};

export const getPostByKey = (key) => {
  return async (dispatch) => {
    dispatch({ type: `${postConstants.GET_POST_BY_KEY}_REQUEST` });
    const db = firebase.firestore();
    const postRef = db.collection(`posts`);
    const commentRef = db.collection("comments");
    postRef.onSnapshot((snapshot) => {
      let postItem = {};
      commentRef.where("pid", "==", key).onSnapshot((commentSnapShot) => {
        const comments = [];
        commentSnapShot.forEach((commentItem) => {
          comments.push(commentItem.data());
        });
        snapshot.forEach((doc) => {
          if (doc.id == key) {
            postItem = { key: doc.id, ...doc.data() };
          }
        });

        if (postItem != {}) {
          dispatch({
            type: `${postConstants.GET_POST_BY_KEY}_SUCCESS`,
            payload: { postItem ,comments },
          });
        } else {
          dispatch({
            type: `${postConstants.GET_POST_BY_KEY}_FAILURE`,
            payload: { error: `Item with key ${key} does not exist` },
          });
        }
      });
    });
  };
};
export const getRealTimePosts = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${postConstants.GET_REALTIME_POSTS}_REQUEST` });
    const db = firebase.firestore();
    db.collection("posts")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const posts = [];
        snapshot.forEach((doc) => {
          posts.push({ key: doc.id, ...doc.data() });
        });
        dispatch({
          type: `${postConstants.GET_REALTIME_POSTS}_SUCCESS`,
          payload: { posts: posts },
        });
      });
  };
};
export const pushPostComment = (comment) => {
  return async (dispatch) => {
    debugger;
    dispatch({ type: `${postConstants.PUSH_COMMENT}_REQUEST` });
    const db = firebase.firestore();
    db.collection("comments")
      .add({
        ...comment,
        createdAt: new Date(),
        liked: 0,
      })
      .then(() => {
        dispatch({ type: `${postConstants.PUSH_COMMENT}_SUCCESS` });
      })
      .catch({ type: `${postConstants.PUSH_COMMENT}_FAILURE` });
  };
};
