import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBIV59nrrBWiyEqQQbkEU4ety9jqP_hZqM",
    authDomain: "food-order-d302c.firebaseapp.com",
    projectId: "food-order-d302c",
    storageBucket: "food-order-d302c.appspot.com",
    messagingSenderId: "103968919080",
    appId: "1:103968919080:web:2c3d957e0c524946522f1d",
    measurementId: "G-H5PKYZ5DT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };