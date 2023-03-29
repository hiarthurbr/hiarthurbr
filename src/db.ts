import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

let firebaseApp: FirebaseApp;
// @ts-ignore
const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;
const firebaseConfig: FirebaseOptions = {
  // This should be safe???? At least I hope so
  apiKey: "AIzaSyCL9WfPSb_ecXatS1LH1wNpn7iFOXl4-OU",
  authDomain: "shopping-list-c5a49s.firebaseapp.com",
  projectId: "shopping-list-c5a49s",
  storageBucket: "shopping-list-c5a49s.appspot.com",
  messagingSenderId: "518590083738",
  appId: "1:518590083738:web:2a937982902b6bacb0a523",
  measurementId: "G-66S3WYYP5P",
  databaseURL: "https://shopping-list-c5a49s-default-rtdb.firebaseio.com/"
};

export const setupFirebase = () => {
  try {
    firebaseApp = initializeApp(firebaseConfig);
  } catch (error) {
    console.error({error})
  }
};

let auth: Auth;
let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

export const useAuth = () => {
  auth = getAuth(firebaseApp);
  if (useEmulator()) {
    connectAuthEmulator(auth, 'http://localhost:9099');
  }
  return auth;
};

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore();
    if (useEmulator()) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
  }
  return firestore;
};

export const useStorage = () => {
  if (!storage) {
    storage = getStorage();
    if (useEmulator()) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  }
  return storage;
};