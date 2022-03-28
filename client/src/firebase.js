
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 
const firebaseConfig = {
  apiKey: "AIzaSyBCr8brQPsYbqPF9bYYsN_jF2nsnOcNSVk",
  authDomain: "minhpv-97e8e.firebaseapp.com",
  projectId: "minhpv-97e8e",
  storageBucket: "minhpv-97e8e.appspot.com",
  messagingSenderId: "906468290653",
  appId: "1:906468290653:web:ff29276d2cdfcb794fddb4",
  measurementId: "G-WGCDDPPZ8Y"
};
// Initialize Firebase
//export
initializeApp(firebaseConfig);
export const auth = getAuth();
// export
