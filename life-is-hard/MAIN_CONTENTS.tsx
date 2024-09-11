import type { ReactNode } from "react";
import { CreateTypeMain } from "./CreateTypeMain";
import { CreateObjectMain } from "./CreateObjectMain";
import type { LihState } from "./state/LihState";
import { LocationsMainContent } from "./game/LocationsMainContent";

export const MAIN_CONTENTS: Record<LihState["mainContent"], ReactNode> = {
  createType: <CreateTypeMain />,
  createObject: <CreateObjectMain />,
  locations: <LocationsMainContent />,
};
