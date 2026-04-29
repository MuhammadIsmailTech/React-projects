# 🚀 Quick Reference Guide

## Essential Commands

```bash
# Start development
npm install
npm run dev

# Build for production
npm run build

# Check code quality
npm run lint
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app component |
| `src/context/PlayerContext.jsx` | Global state management |
| `src/hooks/usePlayer.js` | Access player state |
| `src/data/musicLibrary.js` | Music playlist data |
| `src/styles/theme.js` | Theme colors & components |

## How to...

### Use Player State in a Component

```javascript
import { usePlayer } from "../hooks/usePlayer";

export const MyComponent = () => {
    const { isPlaying, currentTrack, togglePlayPause } = usePlayer();
    
    return <button onClick={togglePlayPause}>Toggle</button>;
};
```

### Create a Styled Component

```javascript
import styled from "styled-components";

const Button = styled.button`
    background: ${props => props.theme.accentPrimary};
    padding: 10px 20px;
    
    @media (max-width: 768px) {
        padding: 8px 16px;
    }
`;
```

### Add a New Song

Edit `src/data/musicLibrary.js`:
```javascript
{
    id: 11,
    title: "Song Name",
    artist: "Artist Name",
    album: "Album Name",
    cover: "image-url",
    src: "audio-url",
    duration: "3:30"
}
```

### Change Theme Colors

Edit `src/styles/theme.js`:
```javascript
export const theme = {
    dark: {
        accentPrimary: "#1db954",  // ← Change this
        // ... other colors
    }
}
```

## Component Tree

```
App
├── Sidebar
├── MainContent
│   ├── TopBar
│   └── ScrollableContent
│       ├── HeroSection
│       ├── Player
│       ├── ProgressBar
│       ├── Controls
│       ├── VolumeControl
│       └── SongList
│           └── SongCard (many)
```

## Player Context Methods

| Method | Description |
|--------|-------------|
| `playTrack(index)` | Play specific track |
| `pauseTrack()` | Pause playback |
| `togglePlayPause()` | Toggle play/pause |
| `nextTrack()` | Skip to next |
| `previousTrack()` | Go to previous |
| `toggleShuffle()` | Toggle shuffle mode |
| `cycleRepeat()` | Cycle repeat modes |
| `toggleLike(trackId)` | Like/unlike song |
| `seekToTime(time)` | Seek to position |
| `handleVolumeChange(vol)` | Set volume (0-1) |
| `toggleMute()` | Mute/unmute |
| `toggleDarkMode()` | Toggle theme |

## State Properties

```javascript
const {
    // Playback
    currentTrack,           // Current song object
    isPlaying,              // Boolean
    currentTime,            // Seconds
    duration,               // Seconds
    
    // Queue
    queue,                  // Array of songs
    currentTrackIndex,      // Current position
    
    // Controls
    volume,                 // 0-1
    isMuted,                // Boolean
    isShuffled,             // Boolean
    repeatMode,             // 0, 1, or 2
    
    // UI
    darkMode,               // Boolean
    likedSongs              // Array of IDs
} = usePlayer();
```

## Responsive Design

```javascript
styled.div`
    /* Desktop (1200px+) */
    grid-template-columns: repeat(4, 1fr);
    
    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;
```

## Common Patterns

### Conditional Rendering
```javascript
{isPlaying ? <PauseIcon /> : <PlayIcon />}
```

### List Rendering
```javascript
{queue.map(track => (
    <SongCard key={track.id} track={track} />
))}
```

### Event Handling
```javascript
onClick={(e) => {
    e.stopPropagation();
    handleAction();
}}
```

### Theme Access
```javascript
color: ${props => props.theme.textPrimary}
```

## Debugging

### Check State
```javascript
const player = usePlayer();
console.log(player);
```

### View Component Tree
1. Install React DevTools
2. Open DevTools → Components tab
3. Inspect components and state

### Check Audio
1. Open browser DevTools
2. Network tab
3. Look for audio requests

## Folder Structure

```
src/
├── components/     ← React components
├── context/        ← State management
├── hooks/          ← Custom hooks
├── data/           ← Static data
├── styles/         ← Styled-components
├── utils/          ← Helper functions
├── App.jsx         ← Main component
└── index.jsx       ← Entry point
```

## File Naming Conventions

- Components: PascalCase (`.jsx`)
- Hooks: camelCase (`.js`)
- Utils: camelCase (`.js`)
- Styles: camelCase or as styled-components
- Data: camelCase (`.js`)

## Common Issues & Solutions

| Issue | Fix |
|-------|-----|
| Styles not updating | Hard refresh (Ctrl+Shift+R) or restart dev server |
| Audio not playing | Check browser console for errors |
| Hook dependency warning | Add all used variables to dependency array |
| Component won't re-render | Check if state is actually changing |
| Port 5173 in use | `npm run dev -- --port 3000` |

## Performance Tips

1. **Use useCallback for event handlers**
```javascript
const handleClick = useCallback(() => {
    togglePlayPause();
}, []);
```

2. **Use useMemo for expensive calculations**
```javascript
const filtered = useMemo(() => {
    return queue.filter(...);
}, [queue]);
```

3. **Avoid inline functions in render**
```javascript
// ❌ Bad
<button onClick={() => togglePlayPause()}>

// ✅ Good
<button onClick={togglePlayPause}>
```

## Useful Links

- [React Docs](https://react.dev)
- [Styled-Components Docs](https://styled-components.com)
- [Vite Docs](https://vitejs.dev)
- [MDN Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

**You're all set! Happy coding! 🎵**
