// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-A7pDHgjEBe0y1MrbKUooC0tGgeFBezc",
  authDomain: "localesitu-db894.firebaseapp.com",
  projectId: "localesitu-db894",
  storageBucket: "localesitu-db894.firebasestorage.app",
  messagingSenderId: "886052887666",
  appId: "1:886052887666:web:1f7d6a91ec364f9b16b6eb",
  measurementId: "G-B30KQN433P",
};

export const provider = new GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
