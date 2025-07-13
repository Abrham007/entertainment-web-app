"use client";

import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut,
  ParsedToken,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/client";
import { removeToken, setToken } from "./actions";

interface AuthContextType {
  currentUser: User | null;
  customClaims: ParsedToken | null;
  handleGoogleLogIn: () => Promise<void>;
  handleEmailLogIn: (email: string, password: string) => Promise<void>;
  handleLogOut: () => Promise<void>;
}

const authContext = createContext<AuthContextType>({
  currentUser: null,
  customClaims: null,
  handleGoogleLogIn: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleEmailLogIn: async (email: string, password: string) => {},
  handleLogOut: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const token = tokenResult.token;
        const refreshToken = user.refreshToken;
        const claims = tokenResult.claims;
        setCustomClaims(claims ?? null);

        if (token && refreshToken) {
          await setToken({
            token,
            refreshToken,
          });
        } else {
          await removeToken();
        }
      } else {
        setCustomClaims(null);
        await removeToken();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleEmailLogIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogOut = async () => {
    console.log("here");
    await signOut(auth);
  };

  return (
    <authContext.Provider
      value={{
        currentUser,
        customClaims,
        handleGoogleLogIn,
        handleEmailLogIn,
        handleLogOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default AuthProvider;
