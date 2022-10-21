// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh7jUEkXvySbxN6A4FfjF7ajNsTVOhPp4",
  authDomain: "fbtodo-d8620.firebaseapp.com",
  projectId: "fbtodo-d8620",
  storageBucket: "fbtodo-d8620.appspot.com",
  messagingSenderId: "270782364034",
  appId: "1:270782364034:web:d578fc05873068628f779b",
  measurementId: "G-PX09T4TVXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;
