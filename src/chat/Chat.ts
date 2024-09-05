import type { Chat as C } from "ai-worker-common";

export type Chat = C;

// export type ChatTextContent = {
//   type: "text";
//   parts: string[];
// };

// export type ChatImageContent = {
//   type: "image";
//   parts: Blob[];
// };

// export type ChatContent = ChatTextContent | ChatImageContent;

// export type Chat = {
//   id: string;
//   name?: string;
//   tags: string[];
//   currentMessageId: string | undefined;
//   messageIds: string[];
//   creation: number;
//   modification: number;
//   userName: string;
//   aiName: string;
//   systemName: string;
//   maxResponseTokens: number;
//   aiCharacterId?: string;
//   userCharacterId?: string;
// };
