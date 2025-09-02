const STORAGE_KEY = 'iptv_insights_session';

/**
 * PUBLIC_INTERFACE
 * authService
 * Simple localStorage based mock authentication service.
 */
export const authService = {
  /** Attempts login. Accepts any non-empty credentials for demo purposes. */
  async login(email, password) {
    await new Promise(r => setTimeout(r, 300));
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }
    const session = {
      user: { id: 'demo-user', email },
      token: 'demo-token'
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session.user;
  },
  /** Clears session. */
  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },
  /** Retrieves session or null. */
  getSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
};
