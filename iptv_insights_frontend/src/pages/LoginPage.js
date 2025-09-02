import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [pending, setPending] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setPending(true);
    try {
      await login(email, pwd);
    } catch (error) {
      setErr(error.message || 'Login failed');
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={{ display:'grid', placeItems:'center', height:'100vh', padding: 16 }}>
      <form onSubmit={submit} style={{
        width: '100%',
        maxWidth: 420,
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        boxShadow: 'var(--shadow)',
        padding: 20,
        display: 'grid',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, display: 'grid',
            placeItems: 'center', color: 'white',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
          }}>IP</div>
          <div>
            <div style={{ fontWeight: 800, color: 'var(--color-primary)' }}>IPTV Insights</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sign in to continue</div>
          </div>
        </div>

        {err && (
          <div style={{
            border: '1px solid rgba(255,111,97,0.3)',
            background: 'rgba(255,111,97,0.08)',
            color: '#7F1D1D',
            padding: 10,
            borderRadius: 10,
            fontSize: 14
          }}>
            {err}
          </div>
        )}

        <div>
          <label htmlFor="email" style={{ display:'block', fontSize:12, color:'var(--text-muted)', marginBottom:6 }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            style={{
              width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid var(--border)', outline:'none'
            }}
          />
        </div>
        <div>
          <label htmlFor="pwd" style={{ display:'block', fontSize:12, color:'var(--text-muted)', marginBottom:6 }}>Password</label>
          <input
            id="pwd"
            type="password"
            value={pwd}
            autoComplete="current-password"
            onChange={(e) => setPwd(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid var(--border)', outline:'none'
            }}
          />
        </div>

        <button type="submit" className="btn" disabled={pending} aria-busy={pending}>
          {pending ? 'Signing in...' : 'Sign in'}
        </button>

        <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
          Demo login accepts any non-empty email/password.
        </div>
      </form>
    </div>
  );
}
