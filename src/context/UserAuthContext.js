import { createContext, useContext, useEffect, useState } from "react";
import { setDoc, doc } from "firebase/firestore"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from "../firebaseInit";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  async function logIn(email, password) {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      toast.success("LogIn Successfully !!");
      return credentials;
    } catch (error) {
      toast.error(`Error in login: ${error.message}`);
      throw error;
    }
  }
  async function signUp(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user1 = userCredential.user;
  
      const userDocRef = doc(db, "users", user1.uid);
  
      await setDoc(userDocRef, {
        uid: user1.uid,
        Name: name,
        cart: [],
        orders: [],
      }); 
  
      console.log("User registered successfully!");
      toast.success(`${name} user Created, Please LogIn to Continue !!`);
      return userCredential;
    } catch (error) {
      console.error("Error registering user:", error.message);
      toast.error(`Error registering user: ${error.message}`);
      throw error;
    }
  }
  async function logOut() {
    try {
      const credentials = await signOut(auth);
      toast.success("LogOut Successfully !!");
      return credentials;
    } catch (error) {
      toast.error(`Error in logout: ${error.message}`);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []); 

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut }}
    > 
      <ToastContainer />
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}