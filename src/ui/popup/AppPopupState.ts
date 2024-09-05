import { createState } from "@mjtdev/engine";
import type { ReactNode } from "react";

export const [useAppPopupState, updateAppPopupState, getAppPopupState] =
  createState({
    // contents: undefined as undefined | ReactNode,
    popupContents: [] as ReactNode[],
  });
