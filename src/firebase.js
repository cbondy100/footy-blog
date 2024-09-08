// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9u68jGW327LKgDc5-HbuBMp9YY-dUGYs",
  authDomain: "footy-blog.firebaseapp.com",
  projectId: "footy-blog",
  storageBucket: "footy-blog.appspot.com",
  messagingSenderId: "555526312236",
  appId: "1:555526312236:web:976df3975dd95071031c89",
  measurementId: "G-4N6X0YGL2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new EmailAuthProvider();
export {auth, db, provider};