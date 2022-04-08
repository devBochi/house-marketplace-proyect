// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfrNHOHhE0-KFWQxQ-DOeWXUHa_LU5f7Y",
  authDomain: "house-marketplace-app-51bd6.firebaseapp.com",
  projectId: "house-marketplace-app-51bd6",
  storageBucket: "house-marketplace-app-51bd6.appspot.com",
  messagingSenderId: "945186801576",
  appId: "1:945186801576:web:5f79eec3c8537dbaa4bf9d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()