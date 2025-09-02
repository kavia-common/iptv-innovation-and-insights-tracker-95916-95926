import React from 'react';
import './styles.css';

const CATEGORIES = ['Innovation', 'Revenue', 'Patent', 'Use Case'];
const REVENUE = ['Advertising', 'Subscription Upsell', 'Licensing', 'Transactions'];
const REGIONS = ['Global', 'North America', 'Europe', 'APAC'];

/**
 * PUBLIC_INTERFACE
 * FiltersPanel
 * Left-side filters with chips/selectors.
 */
export default function FiltersPanel({ value, onChange }) {
  const set = (patch) => onChange?.({ ...value, ...patch });

  const toggleList = (key, v) => {
    const arr = new Set(value[key] || []);
    if (arr.has(v)) arr.delete(v); else arr.add(v);
    set({ [key]: Array.from(arr) });
  };

  return (
    <div className="panel" role="region" aria-label="Filters">
      <div className="panel__title">Filters</div>

      <div className="f__group">
        <label className="f__label">Categories</label>
        <div className="chips">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`chip ${value.categories?.includes(c) ? 'is-active' : ''}`}
              onClick={() => toggleList('categories', c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="f__group">
        <label className="f__label">Revenue Streams</label>
        <div className="chips">
          {REVENUE.map(r => (
            <button
              key={r}
              className={`chip ${value.revenue?.includes(r) ? 'is-active' : ''}`}
              onClick={() => toggleList('revenue', r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="f__group">
        <label className="f__label">Patent</label>
        <div className="chips">
          {['any', 'yes', 'no'].map(p => (
            <button
              key={p}
              className={`chip ${value.patent === p ? 'is-active' : ''}`}
              onClick={() => set({ patent: p })}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="f__group">
        <label className="f__label">Region</label>
        <div className="chips">
          {REGIONS.map(r => (
            <button
              key={r}
              className={`chip ${value.region?.includes(r) ? 'is-active' : ''}`}
              onClick={() => toggleList('region', r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
