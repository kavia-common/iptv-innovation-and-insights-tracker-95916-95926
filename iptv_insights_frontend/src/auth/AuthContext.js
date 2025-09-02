import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * useAuth
 * Hook to access authentication state and actions.
 */
export function useAuth() {
  /** This is a public function. */
  return useContext(AuthContext);
}

/**
 * PUBLIC_INTERFACE
 * AuthProvider
 * Provides auth state and methods for login/logout around the app.
 */
export function AuthProvider({ children }) {
  /** This is a public component exposing authentication context to the tree. */
  const [user, setUser] = useState(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    const session = authService.getSession();
    if (session) setUser(session.user);
    setBootstrapped(true);
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    // PUBLIC_INTERFACE
    async login(email, password) {
      /** Authenticates a user with email/password. */
      const u = await authService.login(email, password);
      setUser(u);
      return u;
    },
    // PUBLIC_INTERFACE
    logout() {
      /** Clears current session and logs out. */
      authService.logout();
      setUser(null);
    }
  }), [user]);

  if (!bootstrapped) {
    return (
      <div style={{display:'grid', placeItems:'center', height:'100vh', color:'var(--text)'}}>
        <div style={{
          padding: 16,
          border: '1px solid var(--border)',
          borderRadius: 12,
          background: 'var(--card)',
          boxShadow: 'var(--shadow)'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
