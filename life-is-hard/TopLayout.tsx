import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AiplChatWindow } from "../src/aipl-components/AiplChatWindow";
import { AiplInput } from "../src/aipl-components/AiplInput";
import { AiplComponentContext } from "../src/provider/AiplComponentContext";
import { TextBox } from "./common/TextBox";
import { StoryForm } from "./StoryForm";
import { AiplButton } from "../src/aipl-components/AiplButton";
import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";

// Define the type for the open prop
interface DrawerContentProps {
  open: boolean;
}

// Styled drawer container
const DrawerContainer = styled(Box)`
  display: flex;
  height: 100%;
  align-items: stretch;
`;

// Styled drawer content with properly typed props
const DrawerContent = styled(Box)<DrawerContentProps>`
  width: ${({ open }) =>
    open ? "22.5ch" : "0"}; /* Drawer width fully collapses */
  padding: ${({ open }) =>
    open ? "2em" : "0"}; /* Remove padding when closed */
  background-color: #2c3e50;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition:
    width 0.3s ease-in-out,
    padding 0.3s ease-in-out;
  overflow: hidden;
`;

// Styled handle to toggle the drawer, always visible
const DrawerHandle = styled(Box)`
  width: 4em;
  height: 100%;
  background-color: #34495e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 1301;
  transition: left 0.3s ease-in-out;
`;

const MainContent = styled(Box)`
  flex-grow: 1;
  /* padding: 2em; */
  overflow-y: auto;
`;

export const TopLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const ctx = useAiplComponentContext();

  // Toggle drawer open/close
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box display="flex" height="100%" width="100%">
      {/* Drawer container */}
      <DrawerContainer>
        <DrawerContent open={drawerOpen}>
          {drawerOpen && (
            <>
              <Typography variant="h6">Configuration</Typography>
              <Typography variant="body1" sx={{ marginTop: "1.5em" }}>
                Character Name: Player
              </Typography>
              <Typography variant="body1">Health: 100</Typography>
              <Typography variant="body1">Mana: 50</Typography>
            </>
          )}
        </DrawerContent>

        {/* Drawer handle for toggling */}
        <DrawerHandle onClick={toggleDrawer}>
          <IconButton color="inherit">
            {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHandle>
      </DrawerContainer>

      {/* Main content area */}
      <MainContent>
        <Stack direction={"row"}>
          <Stack flexGrow={"1"}>
            <StoryForm
              style={{
                maxHeight: "80vh",
                overflow: "auto",
              }}
            />
            <Button
              onClick={() => {
                console.log("New Chat");
                ctx?.client?.startChat();
              }}
            >
              New Chat
            </Button>
          </Stack>
          <Stack>
            <AiplChatWindow
              style={{
                minWidth: "40ch",
                maxWidth: "80ch",
                width: "100%",
              }}
              onUpdate={async (ctx) => {
                console.log("--- updated ---");
                console.log(ctx.componentState);
              }}
            />
          </Stack>
        </Stack>
      </MainContent>
    </Box>
  );
};
