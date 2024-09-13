import type { ReactNode } from "react";
import { CreateObjectMain } from "./CreateObjectMain";
import { CreateTypeMain } from "./CreateTypeMain";
import { LocationsMainContent } from "./game/LocationsMainContent";
import { AdventureMainContent } from "./game/adventure/AdventureMainContent";
import { CategoryMainContent } from "./game/category/CategoryMainContent";
import { GoalsMainContent } from "./game/goal/GoalsMainContent";
import { SaveLoadMainContent } from "./game/saveload/SaveLoadMainContent";

export const MAIN_CONTENTS = {
  createType: <CreateTypeMain />,
  createObject: <CreateObjectMain />,
  locations: <LocationsMainContent />,
  adventure: <AdventureMainContent />,
  goals: <GoalsMainContent />,
  npcCharacters: <CategoryMainContent category="npc" />,
  pcCharacters: <CategoryMainContent category="pc" />,
  saveload: <SaveLoadMainContent />,
} satisfies { [key: string]: ReactNode };
