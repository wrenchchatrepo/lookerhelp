import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from 'firebase/auth';

// Initialize Firebase (these values would typically come from environment variables)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-mode",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo-mode",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo-mode"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Auth Error:', error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
