import { getApps, initializeApp, FirebaseOptions } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyDsHfmeBpuUmjtNs4dLxJn7AfBEZowZ7hM",
    authDomain: "night-clash.firebaseapp.com",
    projectId: "night-clash",
    storageBucket: "night-clash.appspot.com",
    messagingSenderId: "459729114450",
    appId: "1:459729114450:web:ba68767476aeabd8c2968b",
    measurementId: "G-JGK7YGNCEH"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);