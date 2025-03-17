import { useState, useEffect } from "react";
import axios from "axios";
import { auth, googleProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../../../backend/config/firebaseConfig";

const useAuth = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        try {
          const response = await axios.post("http://localhost:5000/auth/verify", {}, {
            headers: { Authorization: `Bearer ${idToken}` },
          });
          setToken(idToken);
          setUser({ ...user, uid: response.data.uid, email: response.data.email });
          localStorage.setItem("authToken", idToken);
        } catch (error) {
          console.error("Authentication verification failed", error);
          logout();
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    await axios.post("http://localhost:5000/auth/verify", {}, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    return userCredential.user;
  };

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    await axios.post("http://localhost:5000/auth/verify", {}, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const googleSignIn = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    await axios.post("http://localhost:5000/auth/verify", {}, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    return result.user;
  };

  return { user, token, login, signup, logout, googleSignIn };
};

export default useAuth;