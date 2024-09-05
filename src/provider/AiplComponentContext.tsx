import { createContext } from "react";
import type { AiplComponentContextState } from "../aipl-components/AiplComponentContextState";

export const AiplComponentContext = createContext<
  AiplComponentContextState | undefined
>(undefined);
