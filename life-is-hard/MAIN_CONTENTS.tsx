import type { ReactNode } from "react";
import { CreateTypeMain } from "./CreateTypeMain";
import { CreateObjectMain } from "./CreateObjectMain";

export const MAIN_CONTENTS: Record<string, ReactNode> = {
  createType: <CreateTypeMain />,
  createObject: <CreateObjectMain />,
};
