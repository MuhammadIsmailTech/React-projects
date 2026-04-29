import React from "react";
import styled from "styled-components";
import { usePlayer } from "../hooks/usePlayer";

const ControlsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    padding: 20px;
`;

const ControlButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => (props.size === "large" ? "56px" : "40px")};
    height: ${(props) => (props.size === "large" ? "56px" : "40px")};
    border-radius: 50%;
    background: ${(props) =>
        props.size === "large"
            ? props.theme.accentPrimary
            : props.active
            ? props.theme.accentPrimary
            : props.theme.bgElevated};
    color: ${(props) =>
        props.size === "large"
            ? "white"
            : props.active
            ? "white"
            : props.theme.textSecondary};
    transition: all 0.2s ease;

    svg {
        width: ${(props) => (props.size === "large" ? "24px" : "20px")};
        height: ${(props) => (props.size === "large" ? "24px" : "20px")};
    }

    &:hover {
        background: ${(props) =>
            props.size === "large"
                ? props.theme.accentHover
                : props.active
                ? props.theme.accentHover
                : props.theme.bgTertiary};
        color: ${(props) => (props.active || props.size === "large" ? "white" : props.theme.textPrimary)};
        transform: scale(1.1);
    }

    &:active {
        background: ${(props) =>
            props.size === "large"
                ? props.theme.accentPressed
                : props.active
                ? props.theme.accentPressed
                : props.theme.bgElevated};
        transform: scale(0.95);
    }
`;

export const Controls = () => {
    const {
        isPlaying,
        togglePlayPause,
        previousTrack,
        nextTrack,
        toggleShuffle,
        isShuffled,
        cycleRepeat,
        repeatMode,
    } = usePlayer();

    return (
        <ControlsContainer>
            <ControlButton onClick={toggleShuffle} active={isShuffled} title="Shuffle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 1 23 7 17 7" />
                    <polyline points="1 23 1 17 7 17" />
                    <path d="M20.362 4.431l-5.36 5.36M3.577 20.364l5.360-5.360" />
                </svg>
            </ControlButton>

            <ControlButton onClick={previousTrack} title="Previous Track">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 13 5 23 5 3" />
                    <rect x="1" y="5" width="2" height="14" />
                </svg>
            </ControlButton>

            <ControlButton size="large" onClick={togglePlayPause} title={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 13 5 23 5 3" />
                    </svg>
                )}
            </ControlButton>

            <ControlButton onClick={nextTrack} title="Next Track">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="19 3 5 13 19 23 19 3" />
                    <rect x="21" y="5" width="2" height="14" />
                </svg>
            </ControlButton>

            <ControlButton
                onClick={cycleRepeat}
                active={repeatMode !== 0}
                title={`Repeat: ${repeatMode === 0 ? "Off" : repeatMode === 1 ? "All" : "One"}`}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="17 2 21 6 17 10" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <polyline points="7 22 3 18 7 14" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
                {repeatMode === 2 && (
                    <span
                        style={{
                            position: "absolute",
                            fontSize: "10px",
                            fontWeight: "bold",
                        }}
                    >
                        1
                    </span>
                )}
            </ControlButton>
        </ControlsContainer>
    );
};
