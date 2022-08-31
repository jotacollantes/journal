// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbgMuLFqok_YEomur9BDoiOkSUgvpcBZM",
    authDomain: "react-journal-app-2f599.firebaseapp.com",
    projectId: "react-journal-app-2f599",
    storageBucket: "react-journal-app-2f599.appspot.com",
    messagingSenderId: "936830330665",
    appId: "1:936830330665:web:8ef6e33882e1b9d585f938"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth=getAuth(FirebaseApp)
export const FirebaseDB=getFirestore(FirebaseApp)