import React, { useState } from 'react';
import './styles.css';
import { useAuth } from '../auth/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Topbar
 * Search bar and action buttons at top of dashboard.
 */
export default function Topbar({ onSearch, onExport, onClearFilters }) {
  const [q, setQ] = useState('');
  const { user, logout } = useAuth();

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(q);
  };

  return (
    <div className="tb" role="region" aria-label="Top navigation and search">
      <form onSubmit={submit} className="tb__search" role="search" aria-label="Search findings">
        <span aria-hidden="true">🔎</span>
        <input
          className="tb__input"
          placeholder="Search innovations, patents, revenue, use cases..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search query"
        />
      </form>
      <button className="btn ghost" onClick={() => { setQ(''); onClearFilters?.(); }}>Reset</button>
      <button className="btn accent" onClick={onExport}>Export CSV</button>
      <button className="btn secondary" onClick={logout} aria-label="Logout">
        {user?.email ? `Logout (${user.email})` : 'Logout'}
      </button>
    </div>
  );
}
