# 🎯 Architecture & Development Guide

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                      App Component                   │
│  (ThemeProvider, PlayerProvider, GlobalStyle)       │
└──────────────────┬──────────────────────────────────┘
                   │
    ┌──────────────┴──────────────┐
    │                             │
┌───▼────────┐          ┌─────────▼────────┐
│  Sidebar   │          │   MainContent    │
│  (UI Only) │          │   (Flex Column)  │
└────────────┘          ├─────────────────┤
                        │    TopBar       │
                        ├─────────────────┤
                        │ ScrollableArea  │
                        │ ├─ HeroSection  │
                        │ ├─ Player       │
                        │ ├─ ProgressBar  │
                        │ ├─ Controls     │
                        │ ├─ VolumeControl│
                        │ └─ SongList     │
                        └─────────────────┘
```

## State Management Flow

```
┌──────────────────────────────────┐
│      PlayerContext               │
│  (Global State Management)       │
│  ├── currentTrack               │
│  ├── isPlaying                  │
│  ├── volume                     │
│  ├── likedSongs                 │
│  └── darkMode                   │
└──────────┬───────────────────────┘
           │
    ┌──────┴─────────┐
    │                │
┌───▼────────┐   ┌──▼───────────────┐
│ usePlayer()│   │ HTML5 Audio API  │
│   Hook     │   │  (audioRef)      │
└────────────┘   └──────────────────┘
```

## Component Communication

Components communicate through:

1. **Props** - For passing data down
2. **usePlayer Hook** - For accessing global state
3. **Event Callbacks** - For user interactions

Example:
```
Sidebar (reads: darkMode)
  └─usePlayer() hook
      └─toggleDarkMode() ✓

Controls (reads: isPlaying, repeatMode, isShuffled)
  └─usePlayer() hook
      └─togglePlayPause(), cycleRepeat(), toggleShuffle() ✓
```

---

## Creating New Components

### 1. Basic Component Template

Create `src/components/MyNewComponent.jsx`:

```javascript
import React from "react";
import styled from "styled-components";
import { usePlayer } from "../hooks/usePlayer";

const ComponentContainer = styled.div`
    padding: 20px;
    background: ${(props) => props.theme.bgElevated};
    border-radius: 8px;
`;

export const MyNewComponent = () => {
    const { /* state variables */ } = usePlayer();

    return (
        <ComponentContainer>
            {/* Your component JSX */}
        </ComponentContainer>
    );
};
```

### 2. Using Hooks

```javascript
import { usePlayer } from "../hooks/usePlayer";

// Inside component:
const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    volume,
    handleVolumeChange
} = usePlayer();
```

### 3. Styled Components

```javascript
import styled from "styled-components";

const Button = styled.button`
    background: ${(props) => props.theme.accentPrimary};
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    
    &:hover {
        background: ${(props) => props.theme.accentHover};
    }

    @media (max-width: 768px) {
        padding: 6px 12px;
        font-size: 0.875rem;
    }
`;
```

### 4. Responsive Design

```javascript
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 16px;
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;
```

---

## Adding New Features

### Feature: Search Functionality

1. **Add to Context** (`src/context/PlayerContext.jsx`):
```javascript
const [searchQuery, setSearchQuery] = useState("");
const [filteredTracks, setFilteredTracks] = useState(queue);

const searchTracks = (query) => {
    setSearchQuery(query);
    const filtered = queue.filter(track =>
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTracks(filtered);
};

// Add to context value:
searchTracks,
searchQuery,
filteredTracks
```

2. **Update Component** (`src/components/TopBar.jsx`):
```javascript
import { usePlayer } from "../hooks/usePlayer";

export const TopBar = () => {
    const { searchTracks } = usePlayer();

    const handleSearch = (e) => {
        searchTracks(e.target.value);
    };

    return (
        <SearchInput onChange={handleSearch} />
    );
};
```

### Feature: Playlist Management

1. **Create Playlist Context**:
```javascript
// src/context/PlaylistContext.jsx
export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);

    const createPlaylist = (name) => {
        const newPlaylist = {
            id: Date.now(),
            name,
            tracks: []
        };
        setPlaylists([...playlists, newPlaylist]);
    };

    // ... more playlist methods
};
```

2. **Wrap App with Provider**:
```javascript
// src/App.jsx
<PlayerProvider>
    <PlaylistProvider>
        <AppContent />
    </PlaylistProvider>
</PlayerProvider>
```

### Feature: Keyboard Shortcuts

1. **Create Hook** (`src/hooks/useKeyboardShortcuts.js`):
```javascript
import { useEffect } from "react";

export const useKeyboardShortcuts = (handleKeys) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    handleKeys.togglePlayPause();
                    break;
                case 'ArrowRight':
                    handleKeys.nextTrack();
                    break;
                case 'ArrowLeft':
                    handleKeys.previousTrack();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeys]);
};
```

2. **Use in App**:
```javascript
const { togglePlayPause, nextTrack, previousTrack } = usePlayer();

useKeyboardShortcuts({
    togglePlayPause,
    nextTrack,
    previousTrack
});
```

---

## Performance Optimization

### 1. Memoization
```javascript
import { useMemo } from "react";

const expensiveValue = useMemo(() => {
    return computeExpensiveValue(dependency);
}, [dependency]);
```

### 2. Code Splitting
```javascript
import { lazy, Suspense } from "react";

const SongList = lazy(() => import("./components/SongList"));

<Suspense fallback={<div>Loading...</div>}>
    <SongList />
</Suspense>
```

### 3. Avoid Unnecessary Re-renders
```javascript
// Use useCallback for event handlers
const handleClick = useCallback(() => {
    togglePlayPause();
}, []);
```

---

## Testing Components

### Example Test with React Testing Library:

```javascript
// src/components/__tests__/Controls.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Controls } from '../Controls';
import { PlayerProvider } from '../../context/PlayerContext';

test('play button toggles isPlaying', async () => {
    render(
        <PlayerProvider>
            <Controls />
        </PlayerProvider>
    );

    const playButton = screen.getByRole('button', { name: /play/i });
    await userEvent.click(playButton);
    // Assert changes
});
```

---

## File Organization Best Practices

```
✅ GOOD
src/
├── components/
│   ├── Player.jsx
│   ├── Player.test.jsx
│   └── Player.styles.js (optional)
├── hooks/
│   └── usePlayer.js
└── context/
    └── PlayerContext.jsx

❌ AVOID
src/
├── components/
│   ├── Player/
│   │   ├── Player.jsx
│   │   ├── PlayerContainer.jsx
│   │   ├── PlayerContent.jsx
│   │   └── index.js (unnecessary)
```

---

## Error Handling

### Example: Handle Audio Loading Errors

```javascript
useEffect(() => {
    const handleError = (e) => {
        console.error("Audio error:", e.target.error);
        // Show user-friendly error message
        setError("Failed to load audio file");
    };

    audio.addEventListener("error", handleError);
    return () => audio.removeEventListener("error", handleError);
}, []);
```

---

## Common Patterns

### Pattern 1: Conditional Rendering
```javascript
{isPlaying ? (
    <PauseButton />
) : (
    <PlayButton />
)}
```

### Pattern 2: List with Key
```javascript
{queue.map((track) => (
    <SongCard key={track.id} track={track} />
))}
```

### Pattern 3: Event Prevention
```javascript
onClick={(e) => {
    e.stopPropagation();
    handleAction();
}}
```

---

## Debugging Tips

### 1. Use React DevTools
- Install React DevTools browser extension
- Inspect component tree
- Monitor state and props changes

### 2. Console Logging
```javascript
console.log("Current state:", { isPlaying, volume, currentTrack });
```

### 3. Browser DevTools
- Network tab: Check audio loading
- Console: Check for errors
- Performance: Monitor render times

### 4. Vite Debug Mode
```bash
DEBUG=* npm run dev
```

---

## Production Checklist

- [ ] Remove console.log statements
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Optimize images
- [ ] Minify code (automatic with `npm run build`)
- [ ] Add meta tags to index.html
- [ ] Test audio playback
- [ ] Check accessibility (a11y)
- [ ] Run `npm run lint`
- [ ] Update README with instructions

---

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality

# Maintenance
npm update           # Update dependencies
npm audit            # Check for vulnerabilities
npm cache clean      # Clear cache
```

---

**For more help, check React and Styled-Components documentation!**
