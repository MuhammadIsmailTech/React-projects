import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { theme } from "./styles/theme";
import { AppContainer, MainContent, ScrollableContent } from "./styles/theme";
import { PlayerProvider, PlayerContext } from "./context/PlayerContext";
import { usePlayer } from "./hooks/usePlayer";

import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { HeroSection } from "./components/HeroSection";
import { Player } from "./components/Player";
import { ProgressBar } from "./components/ProgressBar";
import { Controls } from "./components/Controls";
import { VolumeControl } from "./components/VolumeControl";
import { SongList } from "./components/SongList";

const AppContent = () => {
    const { darkMode } = usePlayer();
    const currentTheme = darkMode ? theme.dark : theme.light;

    return (
        <ThemeProvider theme={currentTheme}>
            <GlobalStyle />
            <AppContainer>
                <Sidebar />
                <MainContent>
                    <TopBar />
                    <ScrollableContent>
                        <HeroSection />
                        <Player />
                        <ProgressBar />
                        <Controls />
                        <VolumeControl />
                        <SongList />
                    </ScrollableContent>
                </MainContent>
            </AppContainer>
        </ThemeProvider>
    );
};

function App() {
    return (
        <PlayerProvider>
            <AppContent />
        </PlayerProvider>
    );
}

export default App;
