import React from 'react';
import './styles.css';
import Badge from './Badge';

/**
 * PUBLIC_INTERFACE
 * DataTable
 * Responsive grid showing IPTV findings.
 */
export default function DataTable({ rows = [], onOpen }) {
  return (
    <div className="grid" role="table" aria-label="Findings table">
      <div className="grid__head" role="row">
        <div>Title</div>
        <div>Category</div>
        <div>Organization</div>
        <div>Date</div>
        <div>Revenue</div>
        <div>Patent</div>
        <div>Tags</div>
        <div aria-hidden="true"></div>
      </div>
      {rows.length === 0 ? (
        <div className="grid__row" role="row">
          <div className="grid__cell--title" style={{ gridColumn: '1 / -1', color: 'var(--text-muted)' }}>
            No results found. Try adjusting search or filters.
          </div>
        </div>
      ) : rows.map(r => (
        <div className="grid__row" key={r.id} role="row">
          <div className="grid__cell--title">{r.title}</div>
          <div><Badge label={r.category} /></div>
          <div>{r.organization}</div>
          <div>{r.date}</div>
          <div>{r.revenue_stream}</div>
          <div>{r.patent ? 'Yes' : 'No'}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {r.tags.map(t => <span className="grid__cell--tag" key={t}>{t}</span>)}
          </div>
          <div style={{ textAlign: 'right' }}>
            <button className="btn" onClick={() => onOpen?.(r)} aria-label={`Open details for ${r.title}`}>Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}
