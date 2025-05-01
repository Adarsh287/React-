
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAa7kGu9z_c2xYk5N--9uvd5MchmVGO44U",
  authDomain: "masai-80900.firebaseapp.com",
  databaseURL: "https://masai-80900-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "masai-80900",
  storageBucket: "masai-80900.firebasestorage.app",
  messagingSenderId: "656523845817",
  appId: "1:656523845817:web:31346dff167a232db9bb68",
  measurementId: "G-LQTMCRCBJG"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const database = getDatabase(app);

export { firestore, database };
