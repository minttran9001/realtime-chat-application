import firebase from "../database/firebase";
import { authConstants } from "./constants";
export const signUp = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    dispatch({
      type: `${authConstants.USER_LOGIN}_REQUEST`,
    });
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const currentUser = firebase.auth().currentUser;
        const name = `${user.firstName} ${user.lastName}`;
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            db.collection("users")
              .doc(data.user.uid)
              .set({
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: new Date(),
                uid: data.user.uid,
                isOnline: true,
              })
              .then(() => {
                const loggedUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email,
                };
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    loggedUser,
                  })
                );
                dispatch({
                  type: `${authConstants.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedUser },
                });
              })
              .catch((err) => {
                dispatch({
                  type: `${authConstants.USER_LOGIN}_FAILURE`,
                  payload: err,
                });
              });
          });
      })
      .catch((error) => {
        dispatch({
          type: `${authConstants.USER_LOGIN}_FAILURE`,
          payload: { error: error.message },
        });
      });
  };
};

export const signIn = (user) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstants.USER_LOGIN}_REQUEST`,
    });
    const db = firebase.firestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            var name = data.user.displayName;
            const avatarUrl = data.user.photoURL;
            name = name.split(" ");
            var stringArray = new Array();
            for (var i = 0; i < name.length; i++) {
              stringArray.push(name[i]);
            }
            const firstName = name[0];
            const lastName = name[1];
            const loggedUser = {
              firstName,
              lastName,
              uid: data.user.uid,
              email: data.user.email,
              avatarUrl,
            };
            localStorage.setItem(
              "user",
              JSON.stringify({
                user: loggedUser,
              })
            );
            dispatch({
              type: `${authConstants.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedUser },
            });
          });
      })
      .catch((err) => {
        dispatch({
          type: `${authConstants.USER_LOGIN}_FAILURE`,
          payload: { error: err.message },
        });
      });
  };
};

export const isLoggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (user) {
      dispatch({
        type: `${authConstants.USER_LOGIN}_SUCCESS`,
        payload: { user: user.user },
      });
    } else {
      dispatch({
        type: `${authConstants.USER_LOGIN}_FAILURE`,
        payload: { error: "" },
      });
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.USER_LOGOUT}_REQUEST` });
    const db = firebase.firestore();
    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            localStorage.clear();
            dispatch({ type: `${authConstants.USER_LOGOUT}_SUCCESS` });
          })
          .catch((err) => {
            dispatch({
              type: `${authConstants.USER_LOGOUT}_FAILURE`,
              payload: { error: err },
            });
          });
      });
  };
};

export const updateUserAvatar = (uid, file) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.UPDATE_USER_AVATAR}_REQUEST` });
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
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: userLocal,
            })
          );
        })

        .then(() => {
          dispatch({
            type: `${authConstants.UPDATE_USER_AVATAR}_SUCCESS`,
            payload: { notify: "Update successfully",  avatarUrl : userLocal.avatarUrl },
          });
        })
        .catch((err) => {
          dispatch({
            type: `${authConstants.UPDATE_USER_AVATAR}_FALURE`,
            payload: { error: err },
          });
        });
    });
  };
};
