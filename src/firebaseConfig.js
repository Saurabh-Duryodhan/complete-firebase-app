// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiM9z6pmZiiZWbI9SlYKsQE3NN_E-WUMk",
  authDomain: "firenestapp.firebaseapp.com",
  projectId: "firenestapp",
  storageBucket: "firenestapp.appspot.com",
  messagingSenderId: "508363806437",
  appId: "1:508363806437:web:85e38de862c48c2a29260c",
  measurementId: "G-GZKSBPSXJZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
