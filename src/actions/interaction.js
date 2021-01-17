import firebase from "../database/firebase";
import { interactionConstants } from "./constants";
function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return true;
}
export const updateLike = (interaction) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    const postRef = db.collection('posts')
    db.collection("interactions")
      .where("uid", "==", interaction.uid)
      .where("pid", "==", interaction.pid)
      .limit(1)
      .get()
      .then((snapshot) => {
        let newObj = {};
        snapshot.forEach((doc) => {
          newObj = {
            key: doc.id,
            ...doc.data(),
          };
        });

        const empty = isEmpty(newObj);
        if (empty) {
          dispatch({ type: `${interactionConstants.UPDATE_LIKE}_REQUEST` });
          db.collection("interactions")
            .add({
              ...interaction,
              createdAt: new Date(),
            })
            .then(() => {
              postRef.doc(interaction.pid).update({
                likeCount: firebase.firestore.FieldValue.increment(1)
            });
              dispatch({
                type: `${interactionConstants.UPDATE_LIKE}_SUCCESS`,
              });
            })
            .catch((error) => {
              dispatch({
                type: `${interactionConstants.UPDATE_LIKE}_FAILURE`,
                payload: { error },
              });
            });
        } else {
          dispatch({ type: `${interactionConstants.UPDATE_LIKE}_REQUEST` });
          db.collection("interactions")
            .doc(newObj.key)
            .delete()
            .then(() => {
              postRef.doc(interaction.pid).update({
                likeCount: firebase.firestore.FieldValue.increment(-1)
            });
              dispatch({
                type: `${interactionConstants.UPDATE_LIKE}_SUCCESS`,
              });
            })
            .catch((error) => {
              dispatch({
                type: `${interactionConstants.UPDATE_LIKE}_FAILURE`,
                payload: { error },
              });
            });
        }
      });
  };
};
export const getRealtimeInteractions = (pid) => {
  return async (dispatch) => {
    if (pid != undefined) {
      const db = firebase.firestore();
      dispatch({
        type: `${interactionConstants.GET_REALTIME_INTERACTIONS}_REQUEST`,
      });
      db.collection("interactions")
        .where("pid", "==", pid)
        .onSnapshot((snapshot) => {
          const interactionArr = [];
          snapshot.forEach((doc) => {
            interactionArr.push(doc.data());
          });
          dispatch({
            type: `${interactionConstants.GET_REALTIME_INTERACTIONS}_SUCCESS`,
            payload: { interactions: interactionArr },
          });
        });
    }
  };
};
