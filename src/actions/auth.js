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
              .add({
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: new Date(),
                uid: data.user.uid,
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
      .catch((err) => {});
  };
};

export const signIn = (user) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstants.USER_LOGIN}_REQUEST`,
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        var name = data.user.displayName;
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
        };
        localStorage.setItem(
          "user",
          JSON.stringify({
            user : loggedUser,
          })
        );
        dispatch({
          type: `${authConstants.USER_LOGIN}_SUCCESS`,
          payload: { user: loggedUser },
        });
      })
      .catch((error) => {
        dispatch({
          type: `${authConstants.USER_LOGIN}_FAILURE`,
          payload: { error },
        });
      });
  };
};

export const isLoggedInUser = ()=>{
  return async dispatch =>{
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if(user)
    {
      dispatch({
        type:`${authConstants.USER_LOGIN}_SUCCESS`,
        payload:{user : user.user},
      })
    }
    else{
      dispatch({
        type:`${authConstants.USER_LOGIN}_FAILURE`,
        payload:{error:'Login again please !'}
      })
    }
  }
}