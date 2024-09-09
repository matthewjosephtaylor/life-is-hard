import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import { hideLoadingScreen } from "../src/ui/hideLoadingScreen";
import { THEME } from "./THEME";
import { TopLayout } from "./TopLayout";
import { StoryTypeInfo } from "./domain/StoryTypeInfo";

export const LifeIsHard = () => {
  useEffect(() => {
    hideLoadingScreen();
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
