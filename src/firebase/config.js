import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // Jika diperlukan

const firebaseConfig = {
  apiKey: "AIzaSyDJMwkiu2zDIAINQ13FPdcHCZgurrzYxSA",
  authDomain: "project-1-54fe5.firebaseapp.com",
  projectId: "project-1-54fe5",
  storageBucket: "project-1-54fe5.firebasestorage.app",
  messagingSenderId: "574181056401",
  appId: "1:574181056401:web:08e5dbadc1d99f7580c430"
};

const app = initializeApp(firebaseConfig);

// Inisialisasi Firebase Auth dengan persistence menggunakan AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Gunakan AsyncStorage untuk menyimpan status auth secara persisten
});

export { auth };
