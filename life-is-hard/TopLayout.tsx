import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import styled from "@emotion/styled";

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
  padding: 2em;
  background-color: #ecf0f1;
  overflow-y: auto;
`;

export const TopLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  // Toggle drawer open/close
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box display="flex" height="100vh">
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
        <Typography variant="h4" gutterBottom>
          Story Area
        </Typography>
        <Typography variant="body1">
          This is where the story content will be displayed. You can show
          dialogs, choices, and other interactions with the player here.
        </Typography>
      </MainContent>
    </Box>
  );
};
