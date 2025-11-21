import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGx6Xv7zx7Kym734uye8p4pCNwBu9r7b4",
  authDomain: "lifequest-7e9bc.firebaseapp.com",
  projectId: "lifequest-7e9bc",
  storageBucket: "lifequest-7e9bc.firebasestorage.app",
  messagingSenderId: "324692906252",
  appId: "1:324692906252:web:4004cf0ff405049d1d7929",
};

// 🔥 EVITA APPS DUPLICADOS
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
