import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';       // to store large size like(file, videos, images)
import 'firebase/compat/firestore';    // to store values (key-value format)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYvhOVEN_y0hNed2FdE2Fb4ZP05AzIOdo",
  authDomain: "reels-project-c3daf.firebaseapp.com",
  projectId: "reels-project-c3daf",
  storageBucket: "reels-project-c3daf.appspot.com",
  messagingSenderId: "664386584883",
  appId: "1:664386584883:web:bcf96bda9e76a3dab5fe46"
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