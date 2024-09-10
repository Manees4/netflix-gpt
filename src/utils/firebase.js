// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3YZMrSbtSaQBrFh5Fc9m7upM4Uh-7ewc",
  authDomain: "netflix-gpt-3-3a7d5.firebaseapp.com",
  projectId: "netflix-gpt-3-3a7d5",
  storageBucket: "netflix-gpt-3-3a7d5.appspot.com",
  messagingSenderId: "471176820375",
  appId: "1:471176820375:web:683f6332e7cb6f5ed81bd2",
  measurementId: "G-M57EZ57NV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();