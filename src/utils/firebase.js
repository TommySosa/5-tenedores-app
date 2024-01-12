import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Añadido el import de AsyncStorage
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDe2gU3QIKOINndbo3h2drpyunHYAUCK80",
    authDomain: "tenedores-tomy.firebaseapp.com",
    projectId: "tenedores-tomy",
    storageBucket: "tenedores-tomy.appspot.com",
    messagingSenderId: "590842033565",
    appId: "1:590842033565:web:36de4e65b0785a10e1ab74"
};

export const initFirebase = initializeApp(firebaseConfig);

export const auth = initializeAuth(initFirebase, {
    persistence: getReactNativePersistence(AsyncStorage)  // Reemplazado ReactNativeAsyncStorage por AsyncStorage
});

export const db = getFirestore(initFirebase)