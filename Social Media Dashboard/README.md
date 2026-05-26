# Social Media Analytics Dashboard (Prototype)

This prototype implements a modern, futuristic UI for a social media analytics dashboard using Next.js, Tailwind CSS, Framer Motion and Chart.js.

Features included:
- Dark glassmorphism UI with neon accents
- Responsive layout (desktop/tablet)
- Animated KPI cards and charts
- Mock real-time feed (simulates WebSocket)
- Sample components: Sidebar, Topbar, Overview, LiveFeed

To run locally:

```bash
cd "Social Media Dashboard"
npm install
npm run dev
```

Notes:
- This prototype uses a mock socket for realtime updates. Replace `utils/mockSocket.js` with a real WebSocket connection to integrate live data.
- Add `react-chartjs-2` and `chart.js` to enable charts if not already installed.
