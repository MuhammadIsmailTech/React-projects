import React from "react";
import styled from "styled-components";
import { usePlayer } from "../hooks/usePlayer";

const HeroContainer = styled.section`
    position: relative;
    height: 400px;
    background: linear-gradient(135deg, #450af5, #c4efd9);
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    @media (max-width: 768px) {
        height: 300px;
        padding: 40px 24px;
    }

    @media (max-width: 480px) {
        height: 250px;
        padding: 30px 16px;
    }

    &::before {
        content: "";
        position: absolute;
        top: -50%;
        right: -10%;
        width: 500px;
        height: 500px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        filter: blur(40px);
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -20%;
        left: -5%;
        width: 400px;
        height: 400px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        filter: blur(40px);
    }
`;

const HeroContent = styled.div`
    position: relative;
    z-index: 2;
    max-width: 600px;
`;

const Badge = styled.span`
    display: inline-block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 6px 12px;
    border-radius: 50px;
    margin-bottom: 16px;
    font-weight: 600;
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: 900;
    color: white;
    margin: 0 0 12px 0;
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.5rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 24px 0;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const PlayButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: white;
    color: #450af5;
    padding: 12px 32px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.2s ease;

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const HeroSection = () => {
    const { togglePlayPause, isPlaying } = usePlayer();

    return (
        <HeroContainer>
            <HeroContent>
                <Badge>Featured Album</Badge>
                <Title>Midnight Horizons</Title>
                <Subtitle>The Weeknd • 2024 • 12 songs</Subtitle>
                <Subtitle style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "24px" }}>
                    Experience the new era of sound with this groundbreaking album that
                    redefines modern R&B.
                </Subtitle>
                <PlayButton onClick={togglePlayPause}>
                    {isPlaying ? (
                        <>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                            Pause Album
                        </>
                    ) : (
                        <>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 13 5 23 5 3" />
                            </svg>
                            Play Album
                        </>
                    )}
                </PlayButton>
            </HeroContent>
        </HeroContainer>
    );
};
