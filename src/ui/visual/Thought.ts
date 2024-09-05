import { VectorMatch } from "ai-worker-common";
import type { ElementAnimation } from "../animation/ElementAnimation";
import { ThoughtDocument } from "./ThoughtDocument";
import type { Thought } from "ai-worker-common/dist/type/thought/Thought";

export type ThoughtAnimations = Animatable & Thought;

// {
//   // id: string;
//   // index: number;
//   // subIndex: number;
//   // text?: string;
//   // image?: Blob;
//   // score: number;
//   // documents: ThoughtDocument[];
//   // ingestResultId?: string;
//   // match?: VectorMatch;
// };

export type Animatable = {
  animations: ElementAnimation[];
};
