import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDcW3NCFHCwJL_bavfOVhcjfxRGGXmmhuk',
  authDomain: 'nextjs-todo-app-1e86a.firebaseapp.com',
  projectId: 'nextjs-todo-app-1e86a',
  storageBucket: 'nextjs-todo-app-1e86a.appspot.com',
  messagingSenderId: '545094049465',
  appId: '1:545094049465:web:3497caa71e75b439de4568',
  measurementId: 'G-VCP99LY4TG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
