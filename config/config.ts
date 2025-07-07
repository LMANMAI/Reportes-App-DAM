// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQ-NvV45bSXupz1b6OxkHjhg9eUCLEslA",
  authDomain: "rn-dam.firebaseapp.com",
  projectId: "rn-dam",
  storageBucket: "rn-dam.firebasestorage.app",
  messagingSenderId: "916334995863",
  appId: "1:916334995863:web:5843a14f4b9568e579fcd2",
  measurementId: "G-7QXFD87L3S",
};

export const provider = new GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
