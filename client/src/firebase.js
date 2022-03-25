
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
//export
initializeApp(firebaseConfig);
export const auth = getAuth();
// export
