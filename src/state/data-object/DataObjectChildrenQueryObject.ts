import type { AppObjectType } from "ai-worker-common";

// WARNING!!!! THESE KEYS MUST BE IN ALPHABETICAL SORT ORDER!

export type DataObjectChildrenQueryObject = [
  { key?: string; },
  { nonce?: string; },
  { objectType: AppObjectType; },
  { parentId: string; }
];
