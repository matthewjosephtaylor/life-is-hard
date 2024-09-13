import type { ReactNode } from "react";
import { AdventureMainContent } from "./game/adventure/AdventureMainContent";
import { CreateObjectMain } from "./CreateObjectMain";
import { CreateTypeMain } from "./CreateTypeMain";
import { LocationsMainContent } from "./game/LocationsMainContent";
import { GoalsMainContent } from "./game/goal/GoalsMainContent";

export const MAIN_CONTENTS = {
  createType: <CreateTypeMain />,
  createObject: <CreateObjectMain />,
  locations: <LocationsMainContent />,
  adventure: <AdventureMainContent />,
  goals: <GoalsMainContent />,
} satisfies { [key: string]: ReactNode };
