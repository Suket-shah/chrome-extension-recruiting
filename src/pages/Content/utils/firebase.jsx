// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import secrets from "../../../../secrets.development";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: secrets.FIREBASE_API_KEY,
  authDomain: secrets.FIREBASE_AUTH_DOMAIN,
  projectId: secrets.FIREBASE_PROJECT_ID,
  storageBucket: secrets.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: secrets.FIREBASE_MESSAGING_SENDER_ID,
  appId: secrets.FIREBASE_APP_ID,
  measurementId: secrets.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, "localhost", 8081);
export default app;
