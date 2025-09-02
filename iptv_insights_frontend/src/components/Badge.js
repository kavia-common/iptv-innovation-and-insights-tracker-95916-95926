import React from 'react';

const colors = {
  Innovation: 'linear-gradient(135deg, #64FFDA, #4CCFB0)',
  Revenue: 'linear-gradient(135deg, #FF6F61, #FF8A80)',
  Patent: 'linear-gradient(135deg, #0A192F, #274060)',
  'Use Case': 'linear-gradient(135deg, #7C3AED, #A78BFA)'
};

/**
 * PUBLIC_INTERFACE
 * Badge
 * Displays category as a colored pill.
 */
export default function Badge({ label }) {
  const style = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: 999,
    color: 'white',
    fontSize: 12,
    background: colors[label] || 'var(--color-primary)'
  };
  return <span style={style}>{label}</span>;
}
