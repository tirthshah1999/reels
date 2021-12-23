import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';       // to store large size like(file, videos, images)
import 'firebase/compat/firestore';    // to store values (key-value format)

const firebaseConfig = {
  // Your web app's Firebase configuration
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
  users: firestore.collection("users"),   // name of database will be user
  posts : firestore.collection("posts"),
  comments: firestore.collection("comments"),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();