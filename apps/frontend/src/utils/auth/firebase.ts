import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { env } from '../env';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: 'dailydesk.firebaseapp.com',
  projectId: 'dailydesk',
  storageBucket: 'dailydesk.appspot.com',
  appId: env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
