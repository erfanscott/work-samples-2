// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS0xruv0YhG6t0adK6BNIILaYnR5TTc2Y",
  authDomain: "realtor-react-117db.firebaseapp.com",
  projectId: "realtor-react-117db",
  storageBucket: "realtor-react-117db.appspot.com",
  messagingSenderId: "17187798445",
  appId: "1:17187798445:web:1f2057cd087207f00df524",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore();
