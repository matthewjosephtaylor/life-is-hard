import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import { StoryForm } from "./StoryForm";

export const MAIN_CONTENTS = {
  createStory: <StoryForm />,
  createType: <Stack>createType</Stack>,
} as const satisfies Record<string, ReactNode>;
