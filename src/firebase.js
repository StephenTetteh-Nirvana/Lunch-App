import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClS9YwyQxh-Gx80jHQlgqn2woJyKEfyzw",
  authDomain: "lunch-app-8e742.firebaseapp.com",
  projectId: "lunch-app-8e742",
  storageBucket: "lunch-app-8e742.firebasestorage.app",
  messagingSenderId: "1071340656932",
  appId: "1:1071340656932:web:077eed21b6457727377bb1"
};


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export {
  db,
  auth
}