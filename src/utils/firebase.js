// Import the functions you need from the SDKs you need
import firebase from "firebase";
import firebaseKey from "assets/json/firebase-key.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseKey.apiKey,
  authDomain: firebaseKey.authDomain,
  projectId: firebaseKey.projectId,
  storageBucket: firebaseKey.storageBucket,
  messagingSenderId: firebaseKey.messagingSenderId,
  appId: firebaseKey.appId,
  measurementId: firebaseKey.measurementId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
