import React from "react";
import styled from "styled-components";
import { usePlayer } from "../hooks/usePlayer";

const SidebarContainer = styled.aside`
    width: 240px;
    background: ${(props) => props.theme.bgSecondary};
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    flex-shrink: 0;
    overflow-y: auto;
    border-right: 1px solid ${(props) => props.theme.bgTertiary};

    @media (max-width: 768px) {
        width: 200px;
        padding: 16px;
    }

    @media (max-width: 480px) {
        display: none;
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;

    svg {
        width: 32px;
        height: 32px;
        color: ${(props) => props.theme.accentPrimary};
    }
`;

const NavMenu = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1;
`;

const NavSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    h3 {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: ${(props) => props.theme.textTertiary};
        margin-bottom: 8px;
        font-weight: 600;
    }
`;

const NavItem = styled.a`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    color: ${(props) =>
        props.active ? props.theme.textPrimary : props.theme.textSecondary};
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    border-radius: 8px;
    background: ${(props) =>
        props.active ? props.theme.bgElevated : "transparent"};

    svg {
        width: 24px;
        height: 24px;
    }

    &:hover {
        color: ${(props) => props.theme.textPrimary};
        background: ${(props) => props.theme.bgElevated};
    }
`;

const PlaylistIcon = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: ${(props) =>
        props.liked
            ? "linear-gradient(135deg, #450af5, #c4efd9)"
            : props.theme.bgElevated};
    color: ${(props) => (props.liked ? "#fff" : props.theme.textSecondary)};
    font-size: 12px;
`;

const ThemeToggle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 8px 12px;
    background: ${(props) => props.theme.bgElevated};
    color: ${(props) => props.theme.textPrimary};
    border-radius: 8px;
    margin-top: auto;

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        background: ${(props) => props.theme.bgTertiary};
    }
`;

export const Sidebar = () => {
    const { toggleDarkMode } = usePlayer();

    return (
        <SidebarContainer>
            <Logo>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                </svg>
                Flow
            </Logo>

            <NavMenu>
                <NavSection>
                    <h3>Menu</h3>
                    <NavItem href="#home" active>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Home
                    </NavItem>
                    <NavItem href="#search">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        Search
                    </NavItem>
                    <NavItem href="#library">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        Library
                    </NavItem>
                </NavSection>

                <NavSection>
                    <h3>Playlists</h3>
                    <NavItem href="#liked">
                        <PlaylistIcon liked>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </PlaylistIcon>
                        Liked Songs
                    </NavItem>
                    <NavItem href="#rock">
                        <PlaylistIcon>🎸</PlaylistIcon>
                        Rock Classics
                    </NavItem>
                    <NavItem href="#jazz">
                        <PlaylistIcon>🎹</PlaylistIcon>
                        Jazz Vibes
                    </NavItem>
                </NavSection>
            </NavMenu>

            <ThemeToggle onClick={toggleDarkMode} title="Toggle Dark Mode">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                Theme
            </ThemeToggle>
        </SidebarContainer>
    );
};
