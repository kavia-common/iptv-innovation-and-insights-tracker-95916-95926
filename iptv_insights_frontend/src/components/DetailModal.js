import React, { useEffect } from 'react';
import './styles.css';

/**
 * PUBLIC_INTERFACE
 * DetailModal
 * Modal displaying detailed info about a finding.
 */
export default function DetailModal({ open, onClose, item }) {
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    if (open) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="modal__backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__title" id="modal-title">{item.title}</div>
          <button className="btn ghost" onClick={onClose} aria-label="Close details">Close</button>
        </div>
        <div className="modal__body">
          <div className="meta">
            <div className="meta__item">
              <div className="meta__label">Category</div>
              <div className="meta__value">{item.category}</div>
            </div>
            <div className="meta__item">
              <div className="meta__label">Organization</div>
              <div className="meta__value">{item.organization}</div>
            </div>
            <div className="meta__item">
              <div className="meta__label">Date</div>
              <div className="meta__value">{item.date}</div>
            </div>
            <div className="meta__item">
              <div className="meta__label">Revenue</div>
              <div className="meta__value">{item.revenue_stream}</div>
            </div>
            <div className="meta__item">
              <div className="meta__label">Patent</div>
              <div className="meta__value">{item.patent ? 'Yes' : 'No'}</div>
            </div>
            <div className="meta__item">
              <div className="meta__label">Region</div>
              <div className="meta__value">{item.region}</div>
            </div>
          </div>

          <div>
            <div className="meta__label">Tags</div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop: 6 }}>
              {item.tags.map(t => (
                <span key={t} className="grid__cell--tag">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="meta__label">Sources</div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop: 6 }}>
              {item.sources.map(s => (
                <span key={s} className="grid__cell--tag">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="meta__label">Summary</div>
            <p style={{ marginTop: 6, lineHeight: 1.6 }}>
              {item.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
