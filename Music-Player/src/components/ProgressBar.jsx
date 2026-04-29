import React, { useRef } from "react";
import styled from "styled-components";
import { usePlayer } from "../hooks/usePlayer";
import { formatTime, calculateProgress, calculateTime } from "../utils/helpers";

const ProgressContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
`;

const TimeText = styled.span`
    font-size: 0.75rem;
    color: ${(props) => props.theme.textSecondary};
    min-width: 40px;
`;

const ProgressBarContainer = styled.div`
    flex: 1;
    height: 6px;
    background: ${(props) => props.theme.bgTertiary};
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
        height: 8px;
    }
`;

const ProgressFill = styled.div`
    height: 100%;
    background: linear-gradient(90deg, ${(props) => props.theme.accentPrimary}, ${(props) => props.theme.accentHover});
    border-radius: 3px;
    transition: width 0.1s linear;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        right: -4px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        background: ${(props) => props.theme.accentPrimary};
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(29, 185, 84, 0.4);
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    ${ProgressBarContainer}:hover &::after {
        opacity: 1;
    }
`;

export const ProgressBar = () => {
    const { currentTime, duration, setCurrentTime, setIsSeeking, seekToTime } = usePlayer();
    const progressRef = useRef(null);

    const handleProgressClick = (e) => {
        if (!progressRef.current) return;

        const rect = progressRef.current.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        const newTime = calculateTime(percentage * 100, duration);

        seekToTime(newTime);
    };

    const handleMouseDown = () => {
        setIsSeeking(true);
    };

    const handleMouseUp = () => {
        setIsSeeking(false);
    };

    React.useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        return () => window.removeEventListener("mouseup", handleMouseUp);
    }, []);

    const progress = calculateProgress(currentTime, duration);

    return (
        <ProgressContainer>
            <TimeText>{formatTime(currentTime)}</TimeText>
            <ProgressBarContainer
                ref={progressRef}
                onClick={handleProgressClick}
                onMouseDown={handleMouseDown}
            >
                <ProgressFill style={{ width: `${progress}%` }} />
            </ProgressBarContainer>
            <TimeText>{formatTime(duration)}</TimeText>
        </ProgressContainer>
    );
};
