// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBvPC0zInPyUvfrp0TWUvlWDQ9vc52i8o",
  authDomain: "twitter-ab17.firebaseapp.com",
  projectId: "twitter-ab17",
  storageBucket: "twitter-ab17.appspot.com",
  messagingSenderId: "363543330703",
  appId: "1:363543330703:web:43899ae5513ee6ebc295fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
export { app, db, storage };