import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAJ65PFgpWW-VoG3mUTzSDAtP5cEPVjEUE",
  authDomain: "fir-todo-449fc.firebaseapp.com",
  projectId: "fir-todo-449fc",
  storageBucket: "fir-todo-449fc.appspot.com",
  messagingSenderId: "274510192647",
  appId: "1:274510192647:web:3af17303af9da17c464aa2",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
