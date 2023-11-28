
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCRlz_YptzGb4zyP4LtiWX4KyYP89ZLPwc",
  authDomain: "buybusy-b9aaf.firebaseapp.com",
  projectId: "buybusy-b9aaf",
  storageBucket: "buybusy-b9aaf.appspot.com",
  messagingSenderId: "883729706649",
  appId: "1:883729706649:web:b87e23f1712a2b09b11208"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 

export default app;