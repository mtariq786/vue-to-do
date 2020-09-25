
import firebase from 'firebase'
import 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCe_WGsTdB7O-p4lR_so-utPJZ6rI6kNmg",
    authDomain: "todo-660cf.firebaseapp.com",
    databaseURL: "https://todo-660cf.firebaseio.com",
    projectId: "todo-660cf",
    storageBucket: "todo-660cf.appspot.com",
    messagingSenderId: "734643863565",
    appId: "1:734643863565:web:1b50e7c32928a1d6a11544",
    measurementId: "G-184BSYNX9S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore  = firebaseApp.firestore();

firestore.settings({timestampsInSnapshots : true});

export default firestore;