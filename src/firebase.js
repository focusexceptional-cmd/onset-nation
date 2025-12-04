import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBp7QYzZ8-8m0-7K9bK4L5M6N7O8P9Q0R1S",
  authDomain: "onset-nation-ecommerce.firebaseapp.com",
  projectId: "onset-nation-ecommerce",
  storageBucket: "onset-nation-ecommerce.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890ghijkl"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
