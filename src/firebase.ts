import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: 'scry-keeper.firebaseapp.com',
  projectId: 'scry-keeper',
  storageBucket: 'scry-keeper.firebasestorage.app',
  messagingSenderId: '714995166594',
  appId: '1:714995166594:web:6974964571c363b1aeb39b',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
