// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJSA8seR0zV02Pnm-ou5F3Ts2sEaCZvfg",
  authDomain: "mywebsite-9635a.firebaseapp.com",
  projectId: "mywebsite-9635a",
  storageBucket: "mywebsite-9635a.appspot.com",
  messagingSenderId: "566658814328",
  appId: "1:566658814328:web:b6fbb67a7c1ea5d656388d",
  measurementId: "G-CNLFNKLQY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
