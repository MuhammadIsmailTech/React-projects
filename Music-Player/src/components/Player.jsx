import React from "react";
import styled, { keyframes } from "styled-components";
import { usePlayer } from "../hooks/usePlayer";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const PlayerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 40px;
    background: linear-gradient(135deg, ${(props) => props.theme.bgElevated}, ${(props) => props.theme.bgSecondary});
    border-radius: 12px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 24px;
        padding: 24px;
    }
`;

const AlbumArt = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &.playing::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 3px solid ${(props) => props.theme.accentPrimary};
        border-radius: 12px;
        animation: ${spin} 3s linear infinite;
    }

    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
    }
`;

const PlayerInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Badge = styled.span`
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${(props) => props.theme.accentPrimary};
    font-weight: 600;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};
    margin: 0;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const Artist = styled.p`
    font-size: 1rem;
    color: ${(props) => props.theme.textSecondary};
    margin: 0;
`;

const Description = styled.p`
    font-size: 0.875rem;
    color: ${(props) => props.theme.textTertiary};
    margin: 8px 0 0 0;
    line-height: 1.5;
`;

export const Player = () => {
    const { currentTrack, isPlaying } = usePlayer();

    if (!currentTrack) {
        return null;
    }

    return (
        <PlayerContainer>
            <AlbumArt className={isPlaying ? "playing" : ""}>
                <img src={currentTrack.cover} alt={currentTrack.title} />
            </AlbumArt>

            <PlayerInfo>
                <Badge>Now Playing</Badge>
                <Title>{currentTrack.title}</Title>
                <Artist>{currentTrack.artist}</Artist>
                <Description>
                    {currentTrack.album} • {currentTrack.duration}
                </Description>
            </PlayerInfo>
        </PlayerContainer>
    );
};
