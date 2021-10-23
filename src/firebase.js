import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB65d8axL28Oc64z2Bn-3KIv_66EzNw5Ec",
  authDomain: "instagram-cc71c.firebaseapp.com",
  projectId: "instagram-cc71c",
  storageBucket: "instagram-cc71c.appspot.com",
  messagingSenderId: "1048320397028",
  appId: "1:1048320397028:web:d007131ae4a364b6b0e6f1",
  measurementId: "G-QWHMJYTX7L"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
