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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
          await fetch("/api/auth/set-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, refreshToken }),
            credentials: "include",
          });
          router.refresh();
        } else {
          await fetch("/api/auth/remove-token", {
            method: "POST",
            credentials: "include",
          });
          router.refresh();
        }
      } else {
        setCustomClaims(null);
        await fetch("/api/auth/remove-token", {
          method: "POST",
          credentials: "include",
        });
        router.refresh();
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleLogIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleEmailLogIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogOut = async () => {
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
