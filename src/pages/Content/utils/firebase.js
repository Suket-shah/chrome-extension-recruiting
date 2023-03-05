// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAbBcKhBCE8bSqxaQ6P_9Y0d9nPDkeLW4s",
    authDomain: "recruiterplus-28695.firebaseapp.com",
    projectId: "recruiterplus-28695",
    storageBucket: "recruiterplus-28695.appspot.com",
    messagingSenderId: "294508991969",
    appId: "1:294508991969:web:803dd49cc2a3b0e612eea0",
    measurementId: "G-TJHG19D6HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;