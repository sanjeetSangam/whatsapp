import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWhAgposnBrUyAN_0qa4u3Iz2qQO3s8vg",
  authDomain: "whatsapp-98d31.firebaseapp.com",
  databaseURL: "https://whatsapp-98d31-default-rtdb.firebaseio.com",
  projectId: "whatsapp-98d31",
  storageBucket: "whatsapp-98d31.appspot.com",
  messagingSenderId: "34130469986",
  appId: "1:34130469986:web:10e58179eacc724d1f9d3b",
  measurementId: "G-YQGC88G2V1",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, firebase };
export default db;
