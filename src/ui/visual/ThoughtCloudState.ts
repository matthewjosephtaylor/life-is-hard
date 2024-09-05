import { createState } from "@mjtdev/engine";
import type { ThoughtAnimations } from "./Thought";

export const [
  useThoughtCloudState,
  updateThoughtCloudState,
  getThoughtCloudState,
] = createState({
  thoughtAnimations: [] as ThoughtAnimations[],
  minScore: 0,
  maxScore: 1,
  activeThoughtIds: [] as string[],
  thoughtIdToElements: {} as Record<string, HTMLElement>,
  thoughtDocumentIdToElements: {} as Record<string, HTMLElement>,
});
