import { Text } from "@radix-ui/themes";
import type { Chat } from "ai-worker-common";
import { CHAT_STATUS_COLORS } from "./CHAT_STATUS_COLORS";
import { useChatStatus } from "./useChatStatus";
import React from "react";

export const ChatStatusDisplay = ({ chat }: { chat: Chat }) => {
  const status = useChatStatus(chat);
  const statusColor = CHAT_STATUS_COLORS[status];
  return <Text color={statusColor}>{status}</Text>;
};
