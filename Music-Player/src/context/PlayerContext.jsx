import React, { createContext, useState, useRef, useEffect } from "react";
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
    const [darkMode, setDarkMode] = useState(true);
    const [likedSongs, setLikedSongs] = useState([]);

    const audio = audioRef.current;

    // Initialize audio element
    useEffect(() => {
        audio.volume = volume;
    }, [volume, audio]);

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
        audio.play();
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
        setIsShuffled(!isShuffled);
    };

    // Cycle repeat mode
    const cycleRepeat = () => {
        setRepeatMode((prev) => (prev + 1) % 3);
    };

    // Toggle like
    const toggleLike = (trackId) => {
        setLikedSongs((prev) =>
            prev.includes(trackId)
                ? prev.filter((id) => id !== trackId)
                : [...prev, trackId]
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
        setDarkMode(!darkMode);
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
        isSeeking,
        darkMode,
        likedSongs,
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
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
