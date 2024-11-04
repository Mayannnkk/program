// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo1S-eHu30vS7WjnXiMhU8W_o-QvQmO9w",
  authDomain: "program-41ddb.firebaseapp.com",
  projectId: "program-41ddb",
  storageBucket: "program-41ddb.firebasestorage.app",
  messagingSenderId: "40818573822",
  appId: "1:40818573822:web:bdf9b01d912389de1640af",
  measurementId: "G-VG2KY7NHHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth();

export {app,auth};