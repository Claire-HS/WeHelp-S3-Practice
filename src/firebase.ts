import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmRso9y_3wRzHqkw-73q08iO_FGyHvEvk",
  authDomain: "wehelp-s3-practice-c1357.firebaseapp.com",
  projectId: "wehelp-s3-practice-c1357",
  storageBucket: "wehelp-s3-practice-c1357.firebasestorage.app",
  messagingSenderId: "154051670236",
  appId: "1:154051670236:web:0d2e4e2937c6c6e6174419",
  measurementId: "G-BGV7KB0DKX",
};

const firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseapp);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { auth };
