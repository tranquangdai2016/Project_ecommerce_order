import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import * as firebase from "firebase"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLNw8IzSJy8y1jW0Ig01JKq3zfav7ZcI0",
  authDomain: "ecommerce-61839.firebaseapp.com",
  projectId: "ecommerce-61839",
  storageBucket: "ecommerce-61839.appspot.com",
  messagingSenderId: "295983348262",
  appId: "1:295983348262:web:3e648bc5634428a90004e7",
};

// if(!firebase.app.length){
//   firebase.initializeApp(config);
// }

// Initialize Firebase
//export
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// export