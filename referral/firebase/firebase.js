import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

var firebaseConfig = {
  apiKey: "AIzaSyA3kLkvm0IxjE_8ivwoPNBJA9b8q2pvrs8",
  authDomain: "on-tai.firebaseapp.com",
  projectId: "on-tai",
  storageBucket: "on-tai.appspot.com",
  messagingSenderId: "609378442957",
  appId: "1:609378442957:web:19aaa666beea5f2e1d5384",
  measurementId: "G-GCPF9KPBEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebase.firestore();
