import React from 'react';
import './styles.css';

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Left navigation with app branding and sections.
 */
export default function Sidebar({ onNavigate = () => {}, active = 'dashboard' }) {
  /** Minimal sidebar; only dashboard section for now. */
  return (
    <aside className="sb">
      <div className="sb__brand">
        <div className="sb__logo">IP</div>
        <div>
          <div className="sb__title">IPTV Insights</div>
          <div className="sb__subtitle">Tracker</div>
        </div>
      </div>
      <nav className="sb__nav">
        <button
          className={`sb__link ${active === 'dashboard' ? 'is-active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          <span className="sb__dot" /> Dashboard
        </button>
        <button className="sb__link is-disabled" disabled>
          <span className="sb__dot" /> Settings
        </button>
        <button className="sb__link is-disabled" disabled>
          <span className="sb__dot" /> Help
        </button>
      </nav>
      <div className="sb__footer">
        <span className="sb__version">v0.1.0</span>
      </div>
    </aside>
  );
}
