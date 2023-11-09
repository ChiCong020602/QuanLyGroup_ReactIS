// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg2FtBGgZEcPcV34m4f-sVR1Pw0oXGrts",
  authDomain: "login-f92d9.firebaseapp.com",
  projectId: "login-f92d9",
  storageBucket: "login-f92d9.appspot.com",
  messagingSenderId: "959883129276",
  appId: "1:959883129276:web:fed3d0b75087cdbef43bb9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getAuth(app);