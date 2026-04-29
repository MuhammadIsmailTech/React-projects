import React, { useState } from "react";
import styled from "styled-components";

const TopBarContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid ${(props) => props.theme.bgTertiary};

    @media (max-width: 768px) {
        padding: 12px 16px;
    }
`;

const SearchBoxContainer = styled.div`
    display: flex;
    align-items: center;
    background: ${(props) => props.theme.bgElevated};
    border-radius: 50px;
    padding: 8px 16px;
    width: 360px;
    gap: 8px;
    transition: all 0.2s ease;

    &:focus-within {
        background: ${(props) => props.theme.bgPrimary};
        box-shadow: 0 0 0 2px ${(props) => props.theme.accentPrimary};
    }

    svg {
        width: 20px;
        height: 20px;
        color: ${(props) => props.theme.textSecondary};
    }

    input {
        background: none;
        border: none;
        color: ${(props) => props.theme.textPrimary};
        font-size: 0.875rem;
        outline: none;
        width: 100%;

        &::placeholder {
            color: ${(props) => props.theme.textSecondary};
        }
    }

    @media (max-width: 768px) {
        width: 250px;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

const UserMenuContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const UpgradeButton = styled.button`
    padding: 8px 24px;
    background: ${(props) => props.theme.accentPrimary};
    color: white;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.875rem;

    &:hover {
        background: ${(props) => props.theme.accentHover};
        transform: scale(1.05);
    }

    &:active {
        background: ${(props) => props.theme.accentPressed};
    }

    @media (max-width: 768px) {
        padding: 6px 16px;
        font-size: 0.75rem;
    }
`;

const Avatar = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

export const TopBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <TopBarContainer>
            <SearchBoxContainer>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    placeholder="Search for songs, artists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </SearchBoxContainer>

            <UserMenuContainer>
                <UpgradeButton>Upgrade</UpgradeButton>
                <Avatar
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="User Avatar"
                />
            </UserMenuContainer>
        </TopBarContainer>
    );
};
