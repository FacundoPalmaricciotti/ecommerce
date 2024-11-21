import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyBVWOg5omJhepF1GYxok3iijnQp-KyAiQY",
    authDomain: "clickandgo-229f7.firebaseapp.com",
    projectId: "clickandgo-229f7",
    storageBucket: "clickandgo-229f7.firebasestorage.app",
    messagingSenderId: "939452425637",
    appId: "1:939452425637:web:5e199bc9fdb20e6566b44c",
    measurementId: "G-X9S11K8N7D"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); 

const db = getFirestore(app);

export { auth, db };