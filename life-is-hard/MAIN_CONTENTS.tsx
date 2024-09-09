import type { ReactNode } from "react";
import { CreateStoryMain } from "./CreateStoryMain";
import { CreateTypeMain } from "./CreateTypeMain";

export const MAIN_CONTENTS = {
  createStory: <CreateStoryMain />,
  createType: <CreateTypeMain />,
} as const satisfies Record<string, ReactNode>;
