// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7zzTm1rm2cS_2lb-7-KyRQGEiCo2G660",
  authDomain: "parejaparavale.firebaseapp.com",
  projectId: "parejaparavale",
  storageBucket: "parejaparavale.firebasestorage.app",
  messagingSenderId: "804069895196",
  appId: "1:804069895196:web:751b680f32d561a2d683d9",
  measurementId: "G-1ZXKEJRFC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);