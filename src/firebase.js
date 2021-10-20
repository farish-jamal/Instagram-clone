import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCtbNKJpp9ijGjEUV22M_jMP527zCPxbqk",
  authDomain: "instagram-b5282.firebaseapp.com",
  projectId: "instagram-b5282",
  storageBucket: "instagram-b5282.appspot.com",
  messagingSenderId: "138023251273",
  appId: "1:138023251273:web:ae2e70f8773d80cabd3e98",
  measurementId: "G-3K3ZRR3X7X",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
