import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBIpM4zArwwbpwn76DczT8eLOPOegemSzQ",
    authDomain: "mentalwellness-7a355.firebaseapp.com",
    projectId: "mentalwellness-7a355",
    storageBucket: "mentalwellness-7a355.appspot.com",
    messagingSenderId: "70739823494",
    appId: "1:70739823494:web:c259ee46a53e9b8eb4fa07",
    measurementId: "G-RE34P2C64D",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
