import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
});
// console.log("Firebase Config:", firebaseConfig);
// console.log("API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
// console.log("Auth Domain:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
// console.log("Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;




