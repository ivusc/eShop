// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'; 
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP2zDuKDvzpCNX-TSVYgj5AqH87jFqH58",
  authDomain: "crix-shop.firebaseapp.com",
  projectId: "crix-shop",
  storageBucket: "crix-shop.appspot.com",
  messagingSenderId: "618971328717",
  appId: "1:618971328717:web:d810c69ff412c0862e7984",
  measurementId: "G-YVX7T0Y1F3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { db, storage, auth }