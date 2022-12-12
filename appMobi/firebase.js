import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDEk4HCWeVf-JsgbTtsCw9KKbGm_NUz-PQ",
  authDomain: "ptudmb-1720d.firebaseapp.com",
  databaseURL: "https://ptudmb-1720d-default-rtdb.firebaseio.com",
  projectId: "ptudmb-1720d",
  storageBucket: "ptudmb-1720d.appspot.com",
  messagingSenderId: "271748156577",
  appId: "1:271748156577:web:152f67cd1a9525cf32f4e0",
  measurementId: "G-JZ3DJ7RKY5"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
