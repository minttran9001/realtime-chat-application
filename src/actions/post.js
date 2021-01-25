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
            likeCount: 0,
            commentCount: 0,
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

export const getPostByKey = (key, ownerId) => {
  return async (dispatch) => {
    dispatch({ type: `${postConstants.GET_POST_BY_KEY}_REQUEST` });
    const db = firebase.firestore();
    const postRef = db.collection(`posts`);
    const userRef = db.collection("users");
    const commentRef = db.collection("comments");

    postRef.get().then((snapshot) => {
      let postItem = {};
      commentRef
        .orderBy("createdAt", "desc")
        .where("pid", "==", key)
        .onSnapshot(async (commentSnapShot) => {
          const comments = [];
          commentSnapShot.forEach((commentItem) => {
            userRef
              .where("uid", "==", commentItem.data().uid)
              .onSnapshot((snap) => {
                snap.forEach((doc) => {
                  comments.push({ sender: doc.data(), ...commentItem.data() });
                });
              });
          });
          const owner = await userRef.doc(ownerId).get();

          snapshot.forEach((doc) => {
            if (doc.id === key) {
              postItem = { key: doc.id, ...doc.data(), owner: owner.data() };
            }
          });

          if (postItem !== {}) {
            dispatch({
              type: `${postConstants.GET_POST_BY_KEY}_SUCCESS`,
              payload: { postItem, comments },
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
          db.collection("interactions")
            .where("pid", "==", doc.id)
            .onSnapshot((query) => {
              query.forEach((dc) => {
                // interactions.push(dc.data());
              });
              posts.push({
                key: doc.id,
                ...doc.data(),
              });
              dispatch({
                type: `${postConstants.GET_REALTIME_POSTS}_SUCCESS`,
                payload: { posts: posts },
              });
            });
        });
      });
  };
};
export const getRealTimePostsNewFeed = () => {
  return async (dispatch) => {
    dispatch({ type: `${postConstants.GET_REALTIME_POSTS_NEW_FEED}_REQUEST` });
    const db = firebase.firestore();
    const userRef = db.collection("users");
    const postRef = db.collection("posts");
    const commentRef = db.collection("comments");
    const interactionRef = db.collection("interactions")
    postRef.onSnapshot(async (snapshot) => {
      const posts = [];
      snapshot.forEach((post) => {
        posts.push({ key: post.id, comments : [],interactions:[],...post.data() });
      });
      let count = 0;
      for (let i = 0; i < posts.length; i++) {
        const owner = userRef.doc(posts[i].uid).get();
        
        commentRef.where("pid", "==", posts[i].key).onSnapshot((snap) => {

          snap.forEach((cmt) => {
            userRef.where("uid", "==", cmt.data().uid).onSnapshot((uSnap) => {
              uSnap.forEach((sender) => {
                posts[i].comments.push({ ...cmt.data(), sender: sender.data() });
              });
            });
          });
        });
        interactionRef.where("pid","==",posts[i].key).onSnapshot((snap)=>{
          snap.forEach((inter)=>{
            userRef.where("uid", "==", inter.data().uid).onSnapshot((uSnap) => {
              uSnap.forEach((sender) => {
                posts[i].interactions.push({ ...inter.data(), sender: sender.data() });
              });
            });
          })
          
        })
        posts[i].owner = (await owner).data();
        if (count === posts.length -1 ) {
            dispatch({
              type: `${postConstants.GET_REALTIME_POSTS_NEW_FEED}_SUCCESS`,
              payload: { posts: [...posts] },
            });
        }
        count += 1;
      }
    });
  };
};
export const pushPostComment = (comment) => {
  return async (dispatch) => {
    debugger;
    dispatch({ type: `${postConstants.PUSH_COMMENT}_REQUEST` });
    const db = firebase.firestore();
    const commentRef = db.collection("comments");
    const postRef = db.collection("posts");
    commentRef
      .add({
        ...comment,
        createdAt: new Date(),
        liked: 0,
      })
      .then(() => {
        postRef.doc(comment.pid).update({
          commentCount: firebase.firestore.FieldValue.increment(1),
        });
        dispatch({ type: `${postConstants.PUSH_COMMENT}_SUCCESS` });
      })
      .catch({ type: `${postConstants.PUSH_COMMENT}_FAILURE` });
  };
};
