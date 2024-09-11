import type { ReactNode } from "react";
import { DesignDrawerContents } from "./DesignDrawerContents";
import { PlayDrawerContents } from "./PlayDrawerContents";
import type { LihState } from "./state/LihState";

export const DRAWER_CONTENTS: Record<LihState["mode"], ReactNode> = {
  design: <DesignDrawerContents />,
  play: <PlayDrawerContents />,
};
