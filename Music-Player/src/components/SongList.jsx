import React from "react";
import styled from "styled-components";
import { usePlayer } from "../hooks/usePlayer";
import { SongCard } from "./SongCard";

const SongListContainer = styled.div`
    padding: 40px;

    @media (max-width: 768px) {
        padding: 24px;
    }
`;

const SectionTitle = styled.h2`
    font-size: 1.75rem;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;

    svg {
        width: 28px;
        height: 28px;
        color: ${(props) => props.theme.accentPrimary};
    }
`;

const SongGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 16px;
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
    }
`;

export const SongList = () => {
    const { queue, playTrack } = usePlayer();

    return (
        <SongListContainer>
            <SectionTitle>
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
                Your Playlist
            </SectionTitle>

            <SongGrid>
                {queue.map((track, index) => (
                    <div
                        key={track.id}
                        onClick={() => playTrack(index)}
                        style={{ cursor: "pointer" }}
                    >
                        <SongCard track={track} />
                    </div>
                ))}
            </SongGrid>
        </SongListContainer>
    );
};
