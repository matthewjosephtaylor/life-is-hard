import type { ThoughtAnimations } from "../../ui/visual/Thought";

export const createThought = (draft: Partial<ThoughtAnimations> = {}): ThoughtAnimations => {
  const {
    index = 0,
    subIndex = 0,
    score = 0,
    documents = [],
    id = `thought-${crypto.randomUUID()}`,
    text,
    animations = [],
    ingestResultId,
    match,
    image,
  } = draft;

  return {
    id,
    index,
    subIndex,
    text,
    documents,
    score,
    animations,
    ingestResultId,
    match,
    image,
  };
};
