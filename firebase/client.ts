// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCCC9f-BXvy5HixIk6G2PDJ8C-Wew3kPvA",
  authDomain: "prepwise-e595f.firebaseapp.com",
  projectId: "prepwise-e595f",
  storageBucket: "prepwise-e595f.firebasestorage.app",
  messagingSenderId: "1074897338213",
  appId: "1:1074897338213:web:29223f9d516244b3e36b8c",
  measurementId: "G-RTVWEYX982",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);