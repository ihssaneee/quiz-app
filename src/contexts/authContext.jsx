import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import {
  auth,
  doc,
  setDoc,
  db,
  getDoc,
  collection,
  addDoc,
} from "../services/firebase";
import {
  signInWithGoogle,
  logOut,
  signUpWithEmail,
  signInWithEmail,
} from "../services/authService";
import { serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
const createUserDocumentIfNotExists = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName || "",
      createdAt: new Date(),
    });
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        createUserDocumentIfNotExists(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const logInWithGoogle = async () => {
    try {
      const currentUser = await signInWithGoogle();
      setUser(currentUser);
      console.log("user signed up successfully with google");
    } catch (error) {
      console.error("user could not sign up with google", error);
      throw error;
    }
  };
  const signOutUser = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };
  const signUpEmail = async (email, password, username) => {
    try {
      const currentUser = await signUpWithEmail(email, password, username);
      setUser(currentUser);
    } catch (error) {
      throw error;
    }
  };
  const logInWithEmail = async (email, password) => {
    try {
      const currentUser = await signInWithEmail(email, password);
      setUser(currentUser);
    } catch (error) {
      throw error;
    }
  };
  const saveQuizHistory = async (quizName, score, totalQuestions) => {
    if (!user) {
      return;
    }
    try {
      const historyRef = collection(db, "users", user.uid, "history");
      await addDoc(historyRef, {
        quizName,
        score,
        totalQuestions,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("quiz history could not be added", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logInWithGoogle,
        signOutUser,
        signUpEmail,
        logInWithEmail,
        saveQuizHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
