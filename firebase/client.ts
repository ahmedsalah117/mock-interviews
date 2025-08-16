// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "prepwise-e595f.firebaseapp.com",
  projectId: "prepwise-e595f",
  storageBucket: "prepwise-e595f.firebasestorage.app",
  messagingSenderId: "1074897338213",
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: "G-RTVWEYX982",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);