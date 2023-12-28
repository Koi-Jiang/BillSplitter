import { firebaseConfig } from "./firebase.config";
import { initializeApp } from "firebase/app";

// initialize firebase
export const app = initializeApp(firebaseConfig);

