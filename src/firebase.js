
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getAuth} from 'firebase/auth'
import "firebase/auth";
// import { auth } from "firebase-admin";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLNw8IzSJy8y1jW0Ig01JKq3zfav7ZcI0",
  authDomain: "ecommerce-61839.firebaseapp.com",
  projectId: "ecommerce-61839",
  storageBucket: "ecommerce-61839.appspot.com",
  messagingSenderId: "295983348262",
  appId: "1:295983348262:web:3e648bc5634428a90004e7"
};

// Initialize Firebase
//export
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


