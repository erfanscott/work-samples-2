import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

export default function useAuthStatus() {
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      }
      setCheckingAuthStatus(false);
    });
  }, []);
  return { isSignedIn, checkingAuthStatus };
}
