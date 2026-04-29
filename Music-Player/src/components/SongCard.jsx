import React, { useState } from "react";
import styled from "styled-components";
import { usePlayer } from "../hooks/usePlayer";

const CardContainer = styled.div`
    background: ${(props) => props.theme.bgElevated};
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 2px solid transparent;

    &:hover {
        background: ${(props) => props.theme.bgTertiary};
        border-color: ${(props) => props.theme.accentPrimary};
        transform: translateY(-4px);
    }

    &.active {
        border-color: ${(props) => props.theme.accentPrimary};
        background: ${(props) => props.theme.bgElevated};
    }
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
    background: ${(props) => props.theme.bgTertiary};

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const PlayOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;

    ${CardContainer}:hover & {
        opacity: 1;
    }

    button {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: ${(props) => props.theme.accentPrimary};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;

        svg {
            width: 24px;
            height: 24px;
        }

        &:hover {
            background: ${(props) => props.theme.accentHover};
            transform: scale(1.1);
        }
    }
`;

const CardContent = styled.div`
    padding: 12px;
`;

const CardTitle = styled.h3`
    font-size: 0.875rem;
    font-weight: 600;
    color: ${(props) => props.theme.textPrimary};
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const CardArtist = styled.p`
    font-size: 0.75rem;
    color: ${(props) => props.theme.textSecondary};
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LikeButton = styled.button`
    margin-top: 8px;
    width: 100%;
    padding: 6px;
    background: ${(props) => (props.liked ? props.theme.accentPrimary : props.theme.bgTertiary)};
    color: ${(props) => (props.liked ? "white" : props.theme.textSecondary)};
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
        background: ${(props) => (props.liked ? props.theme.accentHover : props.theme.bgElevated)};
        color: ${(props) => (props.liked ? "white" : props.theme.textPrimary)};
    }

    svg {
        width: 14px;
        height: 14px;
        margin-right: 4px;
        display: inline-block;
    }
`;

export const SongCard = ({ track }) => {
    const { currentTrack, playTrack, currentTrackIndex, likedSongs, toggleLike } = usePlayer();
    const isActive = currentTrack?.id === track.id;
    const isLiked = likedSongs.includes(track.id);

    const handlePlayClick = () => {
        playTrack(currentTrackIndex);
    };

    return (
        <CardContainer className={isActive ? "active" : ""} onClick={handlePlayClick}>
            <ImageContainer>
                <img src={track.cover} alt={track.title} />
                <PlayOverlay>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        handlePlayClick();
                    }}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 13 5 23 5 3" />
                        </svg>
                    </button>
                </PlayOverlay>
            </ImageContainer>

            <CardContent>
                <CardTitle title={track.title}>{track.title}</CardTitle>
                <CardArtist title={track.artist}>{track.artist}</CardArtist>
                <LikeButton
                    liked={isLiked}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(track.id);
                    }}
                >
                    <svg viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {isLiked ? "Liked" : "Like"}
                </LikeButton>
            </CardContent>
        </CardContainer>
    );
};
