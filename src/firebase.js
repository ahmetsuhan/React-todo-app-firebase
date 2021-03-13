
import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBQXUcy1v-FSHoO3Y1lmgM_SiK9V1gIO3c",
    authDomain: "todo-app-aso.firebaseapp.com",
    projectId: "todo-app-aso",
    storageBucket: "todo-app-aso.appspot.com",
    messagingSenderId: "760722086577",
    appId: "1:760722086577:web:36da3481b8cc82a8cae090",
    measurementId: "G-WJPBNK74S8"
})

const db = firebaseApp.firestore();

export {db};