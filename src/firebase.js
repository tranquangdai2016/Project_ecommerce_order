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