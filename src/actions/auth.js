import firebase from "../database/firebase";
import { authConstants } from "./constants";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const API_KEY = "123123123ASACI9Z999CCAA911S12";

export const signUp = (user) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstants.USER_LOGIN}_REQUEST`,
    });
    const db = firebase.firestore();
    const auth = firebase.auth();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    auth
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
                email: user.email,
                password: hash,
              })
              .then(() => {
                const token = jwt.sign(
                  {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    uid: data.user.uid,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                  },
                  API_KEY,
                  {
                    expiresIn: 150,
                  }
                );

                const loggedUser = {
                  auth: true,
                  token: token,
                };
                localStorage.setItem("user", JSON.stringify(loggedUser));
                isLoggedInUser();
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
    const auth = firebase.auth();
    const userRef = db.collection("users");
    userRef
      .where("email", "==", user.email)
      .get()
      .then((snap) => {
        snap.forEach((result) => {
          if (result.exists) {
            bcrypt.compare(
              user.password,
              result.data().password,
              (err, res) => {
                if (res) {
                  auth
                    .signInWithEmailAndPassword(user.email, user.password)
                    .then((data) => {
                      db.collection("users")
                        .doc(data.user.uid)
                        .update({
                          isOnline: true,
                        })
                        .then(() => {
                          const name = data.user.displayName.split(" ");
                          const avatarUrl = data.user.photoURL;
                          const stringArray = [];
                          for (let i = 0; i < name.length; i++) {
                            stringArray.push(name[i]);
                          }
                          const firstName = name[0];
                          const lastName = name[1];
                          const token = jwt.sign(
                            {
                              avatarUrl,
                              firstName: firstName,
                              lastName: lastName,
                              uid: data.user.uid,
                              email: user.email,
                            },
                            API_KEY,
                            {
                              expiresIn: 150,
                            }
                          );
                          const loggedUser = {
                            auth: true,
                            token: token,
                          };
                          localStorage.setItem(
                            "user",
                            JSON.stringify(loggedUser)
                          );
                          dispatch({
                            type: `${authConstants.USER_LOGIN}_SUCCESS`,
                            payload: {
                              user: {
                                avatarUrl,
                                firstName: firstName,
                                lastName: lastName,
                                uid: data.user.uid,
                                email: user.email,
                              },
                            },
                          });
                        });
                    });
                } else {
                  dispatch({
                    type: `${authConstants.USER_LOGIN}_FAILURE`,
                    payload: { error: "User or password was wrong" },
                  });
                }
              }
            );
          } else {
            dispatch({
              type: `${authConstants.USER_LOGIN}_FAILURE`,
              payload: { error: "User doesn't exists" },
            });
          }
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
      const token = user.token;
      if (!token) {
        localStorage.clear();
        dispatch({
          type: `${authConstants.USER_LOGIN}_FAILURE`,
          payload: { error: "No token" },
        });
      } else {
        jwt.verify(token, API_KEY, (err, decode) => {
          if (err) {
            firebase
              .firestore()
              .collection("users")
              .doc(decode.uid)
              .update({
                isOnline: false,
              })
              .then(() => {
                localStorage.clear();
                dispatch({
                  type: `${authConstants.USER_LOGIN}_FAILURE`,
                  payload: {
                    error: "You have no permission. Please log in again",
                  },
                });
              });
          } else {
            firebase
              .firestore()
              .collection("users")
              .doc(decode.uid)
              .update({
                isOnline: true,
              })
              .then(() => {
                dispatch({
                  type: `${authConstants.USER_LOGIN}_SUCCESS`,
                  payload: { user: decode },
                });
              });
          }
        });
      }
    } else {
      localStorage.clear();

      dispatch({
        type: `${authConstants.USER_LOGIN}_FAILURE`,
        payload: { error: "Login again" },
      });
    }
  };
};
export const setOffLine = (uid) => {
  return async (dispatch) => {
    debugger;
    if (uid !== "") {
      const db = firebase.firestore();
      db.collection("users").doc(uid).update({
        isOnline: false,
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
