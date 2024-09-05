import type { ReactChild } from "react";
import { OverlaySpa } from "../../ui/overlay/OverlaySpa";
import { PlaygroundSpa } from "../../ui/playground/PlaygroundSpa";
import { PowerUserSpa } from "../../ui/Spa";
import { PizzaDemoFront } from "./PizzaDemoFront";

export const APP_FRONTS: Record<string, ReactChild> = {
  "power-user": <PowerUserSpa />,
  playground: <PlaygroundSpa />,
  overlay: <OverlaySpa />,
  "pizza-demo": <PizzaDemoFront />,
} as const;
