import { initializeApp, getApps, cert } from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth"
import {getFirestore} from "firebase-admin/firestore"
//this function is used to initialize the firebase admin sdk. It fetches the apps and checks if we do have apps, then we would not initialize the admin SDK again during dev or production, but if we do not have apps, then we would initialize the admin SDK.
const initFirebaseAdmin = () => {
  const apps = getApps();


  if (!apps?.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        //this replace will make sure to remove any new lines that we do not need within this key.
      }),
    })
  }

  return {
    auth: getAuth(),
    db: getFirestore()
  }
}


export const {auth, db} = initFirebaseAdmin()