import React, { createContext, useState, useRef, useEffect, useMemo } from "react";
import { musicLibrary } from "../data/musicLibrary";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const audioRef = useRef(new Audio());

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat all, 2: repeat one
    const [queue, setQueue] = useState(musicLibrary);
    const [isSeeking, setIsSeeking] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("flow_darkMode")) ?? true;
        } catch (e) {
            return true;
        }
    });
    const [likedSongs, setLikedSongs] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("flow_likedSongs")) || [];
        } catch (e) {
            return [];
        }
    });

    const [searchQuery, setSearchQuery] = useState("");

    const audio = audioRef.current;

    // Initialize audio element
    useEffect(() => {
        audio.volume = volume;
    }, [volume, audio]);

    // Persist likes and theme
    useEffect(() => {
        try {
            localStorage.setItem("flow_likedSongs", JSON.stringify(likedSongs));
        } catch (e) {}
    }, [likedSongs]);

    useEffect(() => {
        try {
            localStorage.setItem("flow_darkMode", JSON.stringify(darkMode));
        } catch (e) {}
    }, [darkMode]);

    // Filtered queue based on search
    const filteredQueue = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return queue;
        return queue.filter((t) => {
            return (
                t.title.toLowerCase().includes(q) ||
                t.artist.toLowerCase().includes(q) ||
                (t.album || "").toLowerCase().includes(q)
            );
        });
    }, [queue, searchQuery]);

    // Load track
    const loadTrack = (index) => {
        if (index < 0 || index >= queue.length) return;

        const track = queue[index];
        audio.src = track.src;
        setCurrentTrackIndex(index);
        setCurrentTime(0);
    };

    // Play track
    const playTrack = (index = currentTrackIndex) => {
        loadTrack(index);
        const p = audio.play();
        if (p && typeof p.then === "function") {
            p.catch(() => {
                // playback failed (CORS or user gesture), gracefully pause
                setIsPlaying(false);
            });
        }
        setIsPlaying(true);
    };

    // Pause track
    const pauseTrack = () => {
        audio.pause();
        setIsPlaying(false);
    };

    // Toggle play/pause
    const togglePlayPause = () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    };

    // Next track
    const nextTrack = () => {
        let nextIndex = currentTrackIndex + 1;

        if (nextIndex >= queue.length) {
            if (repeatMode === 1) {
                nextIndex = 0; // Loop back to start if repeat all
            } else {
                pauseTrack();
                return;
            }
        }

        playTrack(nextIndex);
    };

    // Previous track
    const previousTrack = () => {
        if (currentTime > 3) {
            // If more than 3 seconds played, restart current track
            audio.currentTime = 0;
            setCurrentTime(0);
        } else {
            // Otherwise go to previous track
            const prevIndex = currentTrackIndex - 1;
            if (prevIndex >= 0) {
                playTrack(prevIndex);
            }
        }
    };

    // Toggle shuffle
    const toggleShuffle = () => {
        setIsShuffled((s) => !s);
    };

    // Cycle repeat mode
    const cycleRepeat = () => {
        setRepeatMode((prev) => (prev + 1) % 3);
    };

    // Toggle like
    const toggleLike = (trackId) => {
        setLikedSongs((prev) =>
            prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]
        );
    };

    // Seek to time
    const seekToTime = (time) => {
        audio.currentTime = time;
        setCurrentTime(time);
    };

    // Handle volume change
    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        audio.volume = newVolume;
        if (newVolume > 0) {
            setIsMuted(false);
        }
    };

    // Toggle mute
    const toggleMute = () => {
        if (isMuted) {
            audio.volume = volume;
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode((d) => !d);
    };

    // Audio event listeners
    useEffect(() => {
        const handleTimeUpdate = () => {
            if (!isSeeking) {
                setCurrentTime(audio.currentTime);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            if (repeatMode === 2) {
                // Repeat one track
                audio.currentTime = 0;
                audio.play();
            } else {
                nextTrack();
            }
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audio, currentTrackIndex, repeatMode, isSeeking, queue]);

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e) => {
            const tag = (e.target && e.target.tagName) || "";
            if (tag === "INPUT" || tag === "TEXTAREA") return;

            if (e.code === "Space") {
                e.preventDefault();
                togglePlayPause();
            } else if (e.code === "ArrowRight") {
                nextTrack();
            } else if (e.code === "ArrowLeft") {
                previousTrack();
            } else if (e.code === "ArrowUp") {
                e.preventDefault();
                handleVolumeChange(Math.min(1, volume + 0.05));
            } else if (e.code === "ArrowDown") {
                e.preventDefault();
                handleVolumeChange(Math.max(0, volume - 0.05));
            } else if (e.key === "m") {
                toggleMute();
            } else if (e.key === "s") {
                toggleShuffle();
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [volume, togglePlayPause, nextTrack, previousTrack]);

    const value = {
        // State
        currentTrackIndex,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffled,
        repeatMode,
        queue,
        filteredQueue,
        isSeeking,
        darkMode,
        likedSongs,
        searchQuery,
        currentTrack: queue[currentTrackIndex] || null,

        // Methods
        playTrack,
        pauseTrack,
        togglePlayPause,
        nextTrack,
        previousTrack,
        toggleShuffle,
        cycleRepeat,
        toggleLike,
        seekToTime,
        setCurrentTime,
        handleVolumeChange,
        toggleMute,
        toggleDarkMode,
        setIsSeeking,
        loadTrack,
        setSearchQuery,
    };

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
