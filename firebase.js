import firebaseTest from 'firebase';
import firebaseApp from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

if (!firebaseTest.apps.length) {
  const firebaseTestApp = firebaseTest.initializeApp({
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    // databaseURL: process.env.FIREBASE_DATABASE,
    databaseURL: process.env.FIREBASE_REALTIME_DATABASE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  });
}

// firestore databaseで必要
export const db = firebaseTest.firestore();

// Email認証で必要
export const auth = firebaseTest.auth();

// Google認証で必要
export const fbApp = firebaseApp;

// relatimedatabaseで必要
const RTDB = firebaseTest.database();
export const messagesRef = RTDB.ref('messages');
// console.log('messagesRef:', messagesRef);

export const pushMessage = ({ name, text }) => {
  messagesRef.push({ name, text });
};
