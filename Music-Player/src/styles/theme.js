import styled from "styled-components";

export const theme = {
    light: {
        bgPrimary: "#ffffff",
        bgSecondary: "#f5f5f5",
        bgTertiary: "#efefef",
        bgElevated: "#e8e8e8",
        textPrimary: "#000000",
        textSecondary: "#666666",
        textTertiary: "#999999",
        accentPrimary: "#1db954",
        accentHover: "#1ed760",
        accentPressed: "#169c46",
    },
    dark: {
        bgPrimary: "#0a0a0a",
        bgSecondary: "#121212",
        bgTertiary: "#1a1a1a",
        bgElevated: "#242424",
        textPrimary: "#ffffff",
        textSecondary: "#a7a7a7",
        textTertiary: "#6a6a6a",
        accentPrimary: "#1db954",
        accentHover: "#1ed760",
        accentPressed: "#169c46",
    },
};

export const AppContainer = styled.div`
    display: flex;
    height: 100vh;
    background: ${(props) => props.theme.bgPrimary};
    color: ${(props) => props.theme.textPrimary};
    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    transition: background-color 0.3s ease;
`;

export const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const ScrollableContent = styled.div`
    flex: 1;
    overflow-y: auto;
    padding-bottom: 20px;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.bgTertiary};
        border-radius: 4px;

        &:hover {
            background: ${(props) => props.theme.bgElevated};
        }
    }
`;

export const Container = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
`;
