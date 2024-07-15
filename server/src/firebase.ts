// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FIREBASE_VARS } from "./variables";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_VARS.API_KEY,
    authDomain: FIREBASE_VARS.AUTH_DOMAIN,
    databaseURL: FIREBASE_VARS.DATABASE_URL,
    projectId: FIREBASE_VARS.PROJECT_ID,
    storageBucket: FIREBASE_VARS.STORAGE_BUCKET,
    messagingSenderId: FIREBASE_VARS.MESSAGING_SENDER_ID,
    appId: FIREBASE_VARS.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
