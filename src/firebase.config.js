import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfsEHkMMqBwefyfMCXowcVDK8W3k_qtqI",
  authDomain: "blogpost-6d05a.firebaseapp.com",
  projectId: "blogpost-6d05a",
  storageBucket: "blogpost-6d05a.appspot.com",
  messagingSenderId: "644812652978",
  appId: "1:644812652978:web:8296485bf4b5ca745964ab",
  measurementId: "G-B3FH6C2MW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const fireDb = getFirestore(app);

export {app,fireDb}