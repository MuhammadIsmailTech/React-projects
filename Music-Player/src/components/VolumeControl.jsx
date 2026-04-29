import React, { useRef } from "react";
import styled from "styled-components";
import { usePlayer } from "../hooks/usePlayer";

const VolumeContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px;
    background: ${(props) => props.theme.bgElevated};
    border-radius: 8px;
`;

const VolumeButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: transparent;
    color: ${(props) => props.theme.textSecondary};
    transition: all 0.2s ease;

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        color: ${(props) => props.theme.textPrimary};
        background: ${(props) => props.theme.bgTertiary};
    }
`;

const VolumeSliderContainer = styled.div`
    flex: 1;
    height: 6px;
    background: ${(props) => props.theme.bgTertiary};
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
`;

const VolumeFill = styled.div`
    height: 100%;
    background: linear-gradient(90deg, ${(props) => props.theme.accentPrimary}, ${(props) => props.theme.accentHover});
    border-radius: 3px;
    transition: width 0.1s linear;
`;

export const VolumeControl = () => {
    const {
        volume,
        isMuted,
        handleVolumeChange,
        toggleMute,
    } = usePlayer();
    const sliderRef = useRef(null);

    const handleVolumeClick = (e) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        const newVolume = Math.max(0, Math.min(1, percentage));

        handleVolumeChange(newVolume);
    };

    const displayVolume = isMuted ? 0 : Math.round(volume * 100);

    return (
        <VolumeContainer>
            <VolumeButton onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                {isMuted || volume === 0 ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                ) : volume < 0.5 ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                )}
            </VolumeButton>

            <VolumeSliderContainer
                ref={sliderRef}
                onClick={handleVolumeClick}
                title={`Volume: ${displayVolume}%`}
            >
                <VolumeFill style={{ width: `${displayVolume}%` }} />
            </VolumeSliderContainer>

            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", minWidth: "30px" }}>
                {displayVolume}%
            </span>
        </VolumeContainer>
    );
};
