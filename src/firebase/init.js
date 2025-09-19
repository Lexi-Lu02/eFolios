// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFmWfqN9YGKvDb96GcuuBsFG8O5htQgtE",
  authDomain: "week7-lexi.firebaseapp.com",
  projectId: "week7-lexi",
  storageBucket: "week7-lexi.appspot.com",
  messagingSenderId: "454915061752",
  appId: "1:454915061752:web:22ab5ccef568502fe4480d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db
