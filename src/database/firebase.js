import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyDhWHYUo31EhafDtO8OdAlDZthmVN85TPI",
    authDomain: "realtime-chat-ap.firebaseapp.com",
    projectId: "realtime-chat-ap",
    storageBucket: "realtime-chat-ap.appspot.com",
    messagingSenderId: "930254441751",
    appId: "1:930254441751:web:c256a9a83d26e7af4d7b52",
    measurementId: "G-8Q95J2GC5R",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase