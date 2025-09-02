import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import FiltersPanel from '../components/FiltersPanel';
import DataTable from '../components/DataTable';
import DetailModal from '../components/DetailModal';
import { dataService } from '../services/dataService';
import { downloadTextFile } from '../utils/exportUtils';

export default function DashboardPage() {
  const [filters, setFilters] = useState({
    categories: [],
    revenue: [],
    patent: 'any',
    region: []
  });

  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);

  const fetchRows = async () => {
    setLoading(true);
    try {
      const data = await dataService.fetchAll({ search, filters });
      setRows(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters]);

  const clearAll = () => {
    setSearch('');
    setFilters({
      categories: [],
      revenue: [],
      patent: 'any',
      region: []
    });
  };

  const exportCSV = () => {
    const csv = dataService.exportToCSV(rows);
    if (!csv) return;
    downloadTextFile(`iptv-insights-${Date.now()}.csv`, csv, 'text/csv;charset=utf-8');
  };

  const title = useMemo(() => {
    return 'IPTV Innovation & Insights';
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-muted)' }}>
      <Sidebar active="dashboard" onNavigate={() => {}} />

      <main style={{ flex: 1, padding: 20, display: 'grid', gap: 16 }}>
        <div className="container" style={{ width: '100%', maxWidth: '100%' }}>
          <h1 style={{ margin: 0, marginBottom: 8, color: 'var(--color-primary)' }}>{title}</h1>
          <p style={{ marginTop: 0, color: 'var(--text-muted)' }}>
            A dashboard to explore IPTV innovations, revenue streams, patents, and use cases captured by our bot.
          </p>
        </div>

        <div className="container" style={{ maxWidth: '100%' }}>
          <Topbar
            onSearch={setSearch}
            onExport={exportCSV}
            onClearFilters={clearAll}
          />
        </div>

        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 16,
          alignItems: 'start',
          maxWidth: '100%'
        }}>
          <div>
            <FiltersPanel value={filters} onChange={setFilters} />
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {loading ? (
              <div className="panel">Loading results...</div>
            ) : (
              <DataTable rows={rows} onOpen={setActive} />
            )}
          </div>
        </div>
      </main>

      <DetailModal open={!!active} onClose={() => setActive(null)} item={active} />
    </div>
  );
}
