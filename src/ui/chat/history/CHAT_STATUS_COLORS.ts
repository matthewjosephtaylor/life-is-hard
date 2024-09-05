import type { TextProps } from "@radix-ui/themes";
import type { ChatStatus } from "ai-worker-common";

export const CHAT_STATUS_COLORS = {
  active: "amber",
  ended: "green",
  unknown: "orange",
} as const satisfies Record<ChatStatus, TextProps["color"]>;
