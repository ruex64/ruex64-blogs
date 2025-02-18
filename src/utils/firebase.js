import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCRg0_vlOPwwOHBS9og1fNOvXdyOmTOSw",
    authDomain: "blog-3cc44.firebaseapp.com",
    projectId: "blog-3cc44",
    storageBucket: "blog-3cc44.firebasestorage.app",
    messagingSenderId: "243178236738",
    appId: "1:243178236738:web:76064365bb57d7c1bdb6db",
    measurementId: "G-C328R6XWL1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

const logout = () => signOut(auth);

export { auth, signInWithGoogle, logout };
export { db, collection, addDoc, serverTimestamp };
export { query,orderBy, limit, startAfter, getDocs };