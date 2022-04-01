import {
  initializeApp
} from "firebase/app";
import {
  getAuth
} from 'firebase/auth'
import "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANaNxU1WB9--y-tgzypFv17xlHYTqSyGg",
  authDomain: "duongddt-64fdb.firebaseapp.com",
  projectId: "duongddt-64fdb",
  storageBucket: "duongddt-64fdb.appspot.com",
  messagingSenderId: "1027540720739",
  appId: "1:1027540720739:web:6564f4a9a0775be71fec56",
  measurementId: "G-VYLNF6R89W"
};

// Initialize Firebase
//export
initializeApp(firebaseConfig);
export const auth = getAuth();
// export