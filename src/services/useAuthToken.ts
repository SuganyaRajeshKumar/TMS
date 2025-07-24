import { useState, useEffect } from 'react';

const STORAGE_KEY = 'hdnAuthToken';

export function useAuthToken() {
  const [token, setTokenState] = useState<string | null>(() => {
    return sessionStorage.getItem(STORAGE_KEY);
  });

  const setToken = (newToken: string) => {
    sessionStorage.setItem(STORAGE_KEY, newToken);
    setTokenState(newToken);
  };

  const clearToken = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setTokenState(null);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored !== token) {
      setTokenState(stored);
    }
  }, []);

  return { token, setToken, clearToken };
}
