// import { ChatContent } from "./Chat";

import type { ChatMessage as CM } from "ai-worker-common";

export type ChatMessage = CM;

// export type ChatMessage = {
//   chatId: string;
//   id: string;
//   characterId?: string;
//   disabled?: boolean;
//   parent: string | undefined;
//   createTime: number;
//   updateTime: number;
//   name?: string;
//   role: "system" | "user" | "assistant";
//   content: ChatContent;
//   metadata: Partial<{ model: string }>;
//   status: string;
// };
