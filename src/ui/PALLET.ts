import { Colors } from "@mjtdev/engine";

export const PALLET = {
  windowBackground: Colors.from("hsl(235,11%,23%)").toString(),
  textEntry: Colors.from("hsl(235,11%,23%)").lighten(0.2).toString(),
  textColor: "#cccccc",
  menuBackground: "black",
  success: Colors.from("green").toString(),
  fail: Colors.from("red").toString(),
  unknown: Colors.from("grey").toString(),
} as const;
