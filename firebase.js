// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestone} from 'firebase/firestone'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACoajLLzC6uizPf9hYNDSKPhIoYdko6tw",
  authDomain: "pantry-inventory-manage-app.firebaseapp.com",
  projectId: "pantry-inventory-manage-app",
  storageBucket: "pantry-inventory-manage-app.appspot.com",
  messagingSenderId: "715511513812",
  appId: "1:715511513812:web:29b989a5caa9bde9c7b141",
  measurementId: "G-RWSQ0L18EE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestone = getFirestore(app)
export {app, firestore}