<<<<<<< HEAD
import { initializeApp } from "firebase/app";
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
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
=======
import * as firebase from 'firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdXYp736hawTihPBTC4oIBsW-HL7aJoz4",
    authDomain: "project-ecommerce-order.firebaseapp.com",
    projectId: "project-ecommerce-order",
    storageBucket: "project-ecommerce-order.appspot.com",
    messagingSenderId: "843417851928",
    appId: "1:843417851928:web:26fd837c22af9dd1428b6d"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
>>>>>>> 3f4ea4517aa7640a629d708a14e8212cab071d95
