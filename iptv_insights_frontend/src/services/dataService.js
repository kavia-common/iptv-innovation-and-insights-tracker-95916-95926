const sampleData = [
  {
    id: 'inv-001',
    title: 'Adaptive Bitrate Optimization',
    category: 'Innovation',
    sources: ['Whitepaper', 'Website'],
    tags: ['ABR', 'QoE'],
    organization: 'StreamX Labs',
    date: '2024-04-10',
    summary: 'New ABR algorithm improves quality under constrained networks.',
    revenue_stream: 'Subscription Upsell',
    patent: false,
    region: 'Global'
  },
  {
    id: 'rev-201',
    title: 'Targeted Ad Insertion for Live Channels',
    category: 'Revenue',
    sources: ['LinkedIn', 'Press'],
    tags: ['SSAI', 'Ads'],
    organization: 'AdFlux',
    date: '2024-05-21',
    summary: 'Server-side ad insertion boosts fill rates by 18%.',
    revenue_stream: 'Advertising',
    patent: false,
    region: 'North America'
  },
  {
    id: 'pat-313',
    title: 'Edge Caching for Low-Latency IPTV',
    category: 'Patent',
    sources: ['USPTO'],
    tags: ['Edge', 'Latency'],
    organization: 'NetEdge Inc.',
    date: '2023-12-02',
    summary: 'Patent for distributed edge cache coordination.',
    revenue_stream: 'Licensing',
    patent: true,
    region: 'Europe'
  },
  {
    id: 'use-701',
    title: 'Interactive Sports Stats Overlay',
    category: 'Use Case',
    sources: ['Demo', 'Website'],
    tags: ['Overlay', 'Sports'],
    organization: 'SportStream',
    date: '2024-07-12',
    summary: 'Live stats and betting widgets overlaid on streams.',
    revenue_stream: 'Transactions',
    patent: false,
    region: 'APAC'
  }
];

/**
 * PUBLIC_INTERFACE
 * dataService
 * Provides CRUD-like operations and utilities on IPTV findings.
 */
export const dataService = {
  /** Returns all items, optionally filtered with a query. */
  async fetchAll({ search = '', filters = {} } = {}) {
    await new Promise(r => setTimeout(r, 200));
    const q = search.trim().toLowerCase();

    const { categories = [], revenue = [], patent = 'any', region = [] } = filters;

    return sampleData.filter(item => {
      const matchesQ =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));

      const catOk = categories.length === 0 || categories.includes(item.category);
      const revOk = revenue.length === 0 || revenue.includes(item.revenue_stream);
      const patOk = patent === 'any' || (patent === 'yes' ? item.patent : !item.patent);
      const regOk = region.length === 0 || region.includes(item.region);

      return matchesQ && catOk && revOk && patOk && regOk;
    });
  },

  /** Exports provided rows as CSV string. */
  // PUBLIC_INTERFACE
  exportToCSV(rows) {
    /** Converts the given rows to a CSV string for download. */
    if (!rows || !rows.length) return '';
    const headers = [
      'id',
      'title',
      'category',
      'organization',
      'date',
      'revenue_stream',
      'patent',
      'region',
      'tags',
      'sources',
      'summary'
    ];
    const esc = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;
    const lines = rows.map(r => [
      r.id, r.title, r.category, r.organization, r.date, r.revenue_stream,
      r.patent ? 'Yes' : 'No', r.region, r.tags.join('; '), r.sources.join('; '), r.summary
    ].map(esc).join(','));
    return [headers.join(','), ...lines].join('\n');
  }
};
