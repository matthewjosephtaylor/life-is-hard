import { createState } from "@mjtdev/engine";
import type { MAIN_CONTENTS } from "./MAIN_CONTENTS";

export const [useLihState, updateLihState, getLihState] = createState({
  selectedContent: "createStory" as keyof typeof MAIN_CONTENTS,
});
