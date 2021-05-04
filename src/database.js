import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FB_APIKEY,
    authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECTID
});

const db = firebase.firestore();
export default db;