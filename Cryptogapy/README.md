# 🚀 Cryptogapy - Modern Cryptocurrency Dashboard

A beautiful, responsive, and fully-functional cryptocurrency trading dashboard built with **ReactJS**, **Tailwind CSS**, and **Vite**. Real-time crypto prices powered by CoinGecko API with interactive charts, watchlist management, and dark/light mode support.

![Cryptogapy Dashboard](./public/preview.png)

## ✨ Features

### 📊 Dashboard
- **Portfolio Balance Display** - Shows total portfolio value with 24h profit/loss
- **Live Stats Cards** - Total Value Locked, Active Watchlist count, Trending Now
- **Market Overview** - Bitcoin dominance and active coins on market
- **Top Gainers & Losers** - 24-hour momentum leaders and potential opportunities
- **Real-time Coin Table** - 12-coin market data with live prices, 24h changes, market cap, and volume

### 💎 Premium UI/UX
- **Glassmorphism Design** - Modern frosted glass effects with backdrop blur
- **Dark & Light Mode** - Seamless theme toggle with persistent storage
- **Smooth Animations** - Framer Motion entrance and hover effects
- **Responsive Layouts** - Desktop, tablet, and mobile optimized
- **Gradient Accents** - Premium color schemes with cyan, purple, and emerald highlights

### 📈 Coin Details Page
- **Interactive Price Charts** - Line chart with historical data rendering
- **Time Range Selection** - 7d, 14d, 30d, 90d historical views
- **Market Statistics** - Market cap, 24h volume, circulating supply, all-time high
- **Coin Description** - Detailed info from CoinGecko API
- **Live Price Updates** - Real-time price with percentage change

### 🔍 Search & Discovery
- **Live Coin Search** - Filter market table by coin name or symbol
- **Trending Cryptos** - Display most searched tokens trending now
- **Latest News** - Blockchain news section with timestamps
- **Watchlist Management** - Add/remove favorite coins with persistent storage

### 🎛️ Navigation & Layout
- **Sidebar Navigation** - 5-item navigation menu with active state indicators
- **Top Navbar** - Search bar, notifications, theme toggle, user profile
- **Responsive Mobile** - Sidebar hides on small screens, full mobile optimization
- **Active Route Highlights** - Current page clearly indicated in navigation

### 🎁 Bonus Features
- **Crypto Converter Calculator** - USD to BTC, ETH, USDT conversion
- **Authentication Pages** - Login & Signup UI (dummy implementation)
- **Error Handling** - Graceful error messages for failed API requests
- **Loading Skeletons** - Animated placeholder while data loads
- **404 Page** - Custom not-found route page

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library and component framework |
| **Vite 5** | Lightning-fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **React Router DOM** | Client-side routing and navigation |
| **Axios** | HTTP client for API requests |
| **Chart.js + React ChartJS-2** | Interactive line charts |
| **Framer Motion** | Smooth animations and transitions |
| **Lucide React** | Premium icon library (193+ icons) |
| **CoinGecko API** | Free cryptocurrency market data |

## 📁 Project Structure

```
cryptogapy-dashboard/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   ├── Topbar.jsx       # Header with search & theme
│   │   ├── CryptoTable.jsx  # Market data table
│   │   ├── StatsCard.jsx    # Stat display cards
│   │   ├── CryptoConverter.jsx # USD to crypto converter
│   │   ├── TrendSection.jsx # Trending coins widget
│   │   ├── NewsSection.jsx  # Crypto news feed
│   │   ├── Watchlist.jsx    # Favorite coins display
│   │   └── ToggleSwitch.jsx # Theme toggle control
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx    # Main dashboard view
│   │   ├── CoinDetail.jsx   # Individual coin page
│   │   ├── Login.jsx        # Auth login page
│   │   ├── Signup.jsx       # Auth signup page
│   │   └── NotFound.jsx     # 404 error page
│   ├── context/
│   │   └── AppContext.jsx   # Global state management
│   ├── services/
│   │   └── api.js           # CoinGecko API endpoints
│   ├── utils/
│   │   └── format.js        # Number formatting utilities
│   ├── data/
│   │   └── dummy.js         # Dummy data for UI
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles & animations
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ and npm/yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone or download the project**
   ```bash
   cd cryptogapy-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173` or `http://localhost:5174`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📱 UI Features in Detail

### Dashboard Layout
- **Left Sidebar** (hidden on mobile) - Navigation with active indicators
- **Top Navbar** - Search, notifications, theme toggle, user menu
- **Main Content** - Full-width responsive grid layout
- **Cards & Panels** - Glassmorphic design with smooth shadows

### Theme System
```javascript
// Toggle between dark and light themes
Theme Toggle Button → AppContext → localStorage
localStorage key: 'cryptogapy-theme'
```

### Watchlist Management
```javascript
// Add/Remove coins from watchlist
Add Button → AppContext → localStorage
localStorage key: 'cryptogapy-watchlist'
Watchlist: ['bitcoin', 'ethereum', 'cardano']
```

## 🔌 API Integration

### CoinGecko API Endpoints Used

```javascript
// Fetch top 24 coins with market data
GET /coins/markets?vs_currency=usd&order=market_cap_desc&per_page=24

// Get single coin details with market info
GET /coins/{id}?localization=false&market_data=true

// Historical price data for charts
GET /coins/{id}/market_chart?vs_currency=usd&days=30

// Trending coins on the network
GET /search/trending
```

### Free Tier Limits
- Rate limit: 10-50 calls/minute (free tier)
- No authentication key required
- Perfect for learning and demo projects

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Surface | `#0b1220` | Background |
| Surface2 | `#111a2f` | Cards |
| Brand | `#5b7dff` | Buttons & accents |
| Neon | `#57f3ff` | Highlights |
| Slate-950 | `#020617` | Dark mode |
| Slate-100 | `#f1f5f9` | Light mode |

### Typography
- **Font**: Inter, system UI sans-serif
- **Headlines**: 2xl-4xl, semibold (600)
- **Body**: sm-base, regular to semibold
- **Tracking**: Uppercase with letter-spacing for labels

### Spacing & Radius
- **Border Radius**: 3xl (24px) for cards and buttons
- **Padding**: 4-8 units for internal spacing
- **Gap**: 4-6 units between components
- **Border**: 1px slate-700/80 with 10% opacity

## 🔧 Customization Guide

### Change Brand Color
Edit `tailwind.config.js`:
```javascript
colors: {
  brand: '#your-color-here'
}
```

### Add More Navigation Items
Edit `src/components/Sidebar.jsx`:
```javascript
const navItems = [
  { id: 'new', href: '/route', label: 'Label', icon: IconName }
]
```

### Modify API Data Refresh Rate
Edit `src/context/AppContext.jsx`:
```javascript
const interval = setInterval(loadMarkets, 60000); // 60 seconds
```

### Add Custom Coins to Watchlist
Edit `src/context/AppContext.jsx`:
```javascript
const [watchlist, setWatchlist] = useState([
  'bitcoin', 'ethereum', 'your-coin-id'
]);
```

## 📊 Components Usage Examples

### StatsCard
```jsx
<StatsCard 
  title="Total Value Locked" 
  amount="$133M" 
  accent="from-cyan-400 to-blue-600" 
/>
```

### CryptoTable
```jsx
<CryptoTable coins={coins} loading={loading} />
```

### TrendSection
```jsx
<TrendSection coins={trending.slice(0, 4)} />
```

## 🐛 Known Issues & Fixes

### Issue: "TrendUp export error"
**Fixed**: Replaced `TrendUp` with `TrendingUp` from lucide-react

### Issue: Duplicate key warnings in console
**Fixed**: Added unique IDs to navigation items

### Issue: Chart not rendering
**Solution**: Ensure `import 'chart.js/auto'` is in main.jsx

## 🚀 Performance Optimizations

- **Lazy Loading**: Components load on-demand with React Router
- **Memoization**: useCallback and useMemo prevent unnecessary re-renders
- **API Caching**: Data refreshes every 60 seconds (configurable)
- **CSS Purging**: Tailwind removes unused CSS in production
- **Image Optimization**: CoinGecko CDN provides optimized images

## 🔐 Security Notes

- **No Authentication**: Demo uses dummy user data (localStorage based)
- **Public API**: CoinGecko API has no rate limiting on free tier
- **No Private Keys**: This is a view-only dashboard
- **For Production**: Implement proper auth with JWT/OAuth2

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [CoinGecko API](https://www.coingecko.com/api/documentations/v3)
- [Chart.js Docs](https://www.chartjs.org)
- [Framer Motion](https://www.framer.com/motion)

## 🤝 Contributing

This is a learning project. Feel free to:
- Fork and customize
- Add more features (portfolio tracker, alerts, etc.)
- Improve UI/UX
- Optimize performance
- Add tests

## 📄 License

MIT License - Free to use and modify for personal and commercial projects.

## 💡 Future Enhancement Ideas

- [ ] Portfolio tracker with buy/sell history
- [ ] Price alerts and notifications
- [ ] Advanced candlestick charts
- [ ] Order book visualization
- [ ] Cryptocurrency news integration (NewsAPI)
- [ ] Multi-language support
- [ ] User authentication backend
- [ ] Real-time WebSocket updates
- [ ] Export portfolio as PDF
- [ ] Compare multiple cryptocurrencies

## 🎯 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 👨‍💻 Author

Built with ❤️ for crypto enthusiasts learning React, Tailwind, and modern web development.

---

**Ready to trade?** Start the dev server with `npm run dev` and explore the crypto market! 🚀📈
