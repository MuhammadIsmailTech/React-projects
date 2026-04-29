# 🎵 Flow Music Player - React Version

A modern, fully-responsive Spotify-style music player built with **React 18**, **Styled-Components**, and **Vite**. Features a beautiful dark/light theme, advanced playback controls, and a component-based architecture following React best practices.

## ✨ Features

### Core Features
- ✅ **Play/Pause/Skip** - Full playback control
- ✅ **Progress Bar** - Seek through tracks with time display
- ✅ **Volume Control** - Adjustable volume with mute toggle
- ✅ **Shuffle & Repeat** - Shuffle all or repeat one/all tracks
- ✅ **Like/Favorite** - Save favorite songs
- ✅ **Song Queue** - Browse and select from playlist
- ✅ **Responsive Design** - Fully responsive on mobile, tablet, and desktop

### Advanced Features
- 🌙 **Dark Mode Toggle** - Switch between dark and light themes
- 🎨 **Modern UI** - Spotify-inspired design with smooth animations
- ⚡ **React Hooks** - Functional components with useState, useEffect, useContext
- 🎯 **Clean Architecture** - Modular, reusable components
- 📱 **Mobile Optimized** - Touch-friendly controls

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx           # Navigation sidebar with playlists
│   ├── TopBar.jsx            # Search and user menu
│   ├── HeroSection.jsx       # Featured album showcase
│   ├── Player.jsx            # Now playing display with album art
│   ├── ProgressBar.jsx       # Audio progress and seek control
│   ├── Controls.jsx          # Play/Pause, Next, Previous, Shuffle, Repeat
│   ├── VolumeControl.jsx     # Volume slider and mute toggle
│   ├── SongCard.jsx          # Individual song card component
│   └── SongList.jsx          # Grid of all songs
├── context/
│   └── PlayerContext.jsx     # Global player state management
├── hooks/
│   └── usePlayer.js          # Custom hook for accessing player context
├── data/
│   └── musicLibrary.js       # Music playlist data
├── utils/
│   └── helpers.js            # Utility functions (formatTime, etc.)
├── styles/
│   ├── theme.js              # Theme colors and styled components
│   └── globalStyle.js        # Global CSS-in-JS styles
├── App.jsx                   # Main app component
├── index.jsx                 # React entry point
package.json
vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview