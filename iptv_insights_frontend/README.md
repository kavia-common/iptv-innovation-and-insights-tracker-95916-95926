# IPTV Insights Tracker – Frontend

A modern, minimalistic React UI to explore IPTV innovations, revenue streams, patents, and use cases.

## Features
- User authentication (demo: any non-empty email/password)
- Main dashboard with sidebar navigation
- Top search bar
- Left filters (category, revenue, patent, region)
- Responsive data grid/table with details modal
- CSV export of current results
- Light theme with primary (#0A192F), secondary (#64FFDA), accent (#FF6F61)

## Scripts
- `npm start` – start dev server
- `npm test` – run tests
- `npm run build` – production build

## Notes
- Routing uses `react-router-dom@6`.
- Auth is localStorage-based for demo purposes and can be replaced by a real provider.
- All theme colors are defined in `src/index.css`.
