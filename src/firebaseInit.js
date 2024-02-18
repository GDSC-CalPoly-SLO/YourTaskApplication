// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOs4eYn7AAHy5ksxw-ENvypNE5gv8m-qI",
  authDomain: "task-app-7f224.firebaseapp.com",
  projectId: "task-app-7f224",
  storageBucket: "task-app-7f224.appspot.com",
  messagingSenderId: "1099184639172",
  appId: "1:1099184639172:web:736d8a5cf89b0e112c0d91",
  measurementId: "G-RS0PL729MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
