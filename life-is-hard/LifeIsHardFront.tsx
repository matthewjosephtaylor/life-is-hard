import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { hideLoadingScreen } from "../src/ui/hideLoadingScreen";
import { THEME } from "./THEME";
import { TopLayout } from "./TopLayout";
import {
  loadGameIntoBrowserState,
  loadGamePackFromUrl,
  loadGamePackIntoBrowserState,
  loadGameSaveFromUrl,
} from "./state/SaveLoadGames";

export const bootGameBrowser = async () => {
  console.log("booting game...");
  await loadGamePackIntoBrowserState();
  await loadGameIntoBrowserState();
  console.log("game booted");
};

export const bootGameUrl = async () => {
  console.log("booting game...");
  await loadGamePackFromUrl("./assets/Default.gamepack");
  await loadGameSaveFromUrl("./assets/current.gamesave");
  console.log("game booted");
};

export const LifeIsHard = () => {
  useEffect(() => {
    hideLoadingScreen();
    // bootGameBrowser();
    bootGameUrl();
  }, []);

  return (
    <ThemeProvider theme={THEME}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "10px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
          "::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
        }}
      />

      <TopLayout />
    </ThemeProvider>
  );
};
