import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { hideLoadingScreen } from "../src/ui/hideLoadingScreen";
import { THEME } from "./THEME";
import { TopLayout } from "./TopLayout";

export const LifeIsHard = () => {
  useEffect(() => {
    hideLoadingScreen();
  }, []);

  return (
    <React.StrictMode>
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
    </React.StrictMode>
  );
};
