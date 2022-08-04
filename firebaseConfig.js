// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ8P_Pm4cBZdBGmIpVJdOOLrWC1mVrKsA",
  authDomain: "firenestjs.firebaseapp.com",
  projectId: "firenestjs",
  storageBucket: "firenestjs.appspot.com",
  messagingSenderId: "755937634902",
  appId: "1:755937634902:web:5cc1d6c0b81953890e29f7",
  measurementId: "G-2FN9F8MFN9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);