import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiM9z6pmZiiZWbI9SlYKsQE3NN_E-WUMk",
  authDomain: "firenestapp.firebaseapp.com",
  projectId: "firenestapp",
  storageBucket: "firenestapp.appspot.com",
  messagingSenderId: "508363806437",
  appId: "1:508363806437:web:85e38de862c48c2a29260c",
  measurementId: "G-GZKSBPSXJZ",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
