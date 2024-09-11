import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { DrawerContents } from "./DrawerContents";
import { gamePackSchemasToMainContent } from "./gamePackSchemasToMainContent";
import { MAIN_CONTENTS } from "./MAIN_CONTENTS";
import { useLihState } from "./state/LihState";

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
    open ? "0.5em" : "0"}; /* Remove padding when closed */
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
  width: 1em;
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
  const { mainContent: selectedContent, gamePack } = useLihState();
  // const schemaMainContents = gamePackSchemasToMainContent(gamePack);
  const mainContent = MAIN_CONTENTS[selectedContent];
  // ?? schemaMainContents[selectedContent];

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
              <DrawerContents />
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
      <MainContent>{mainContent}</MainContent>
    </Box>
  );
};
