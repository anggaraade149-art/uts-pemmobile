import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'mobileprojectapp.session';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedSession = await SecureStore.getItemAsync(SESSION_KEY);
        if (storedSession) {
          setSession(JSON.parse(storedSession));
        }
      } catch (error) {
        console.warn('Sesi tidak dapat dipulihkan.', error);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  const value = useMemo(
    () => ({
      session,
      isLoading,
      async signIn(email, password) {
        const normalizedEmail = email.trim().toLowerCase();

        if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
          throw new Error('Masukkan alamat email yang valid.');
        }

        if (password.length < 6) {
          throw new Error('Kata sandi minimal terdiri dari 6 karakter.');
        }

        const profile = {
          email: normalizedEmail,
          name: normalizedEmail.split('@')[0].replace(/[._-]/g, ' '),
        };

        await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(profile));
        setSession(profile);
      },
      async signOut() {
        await SecureStore.deleteItemAsync(SESSION_KEY);
        setSession(null);
      },
    }),
    [isLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider.');
  }

  return context;
}
