import { createState } from "@mjtdev/engine";
import type { TAB_NAME } from "../../ui/TAB_NAME";

export const [
  useMainViewportState,
  updateMainViewportState,
  getMainViewportState,
] = createState({
  windowKey: undefined as TAB_NAME | undefined,
});
