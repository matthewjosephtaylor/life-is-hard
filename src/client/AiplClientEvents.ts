// import type { CustomEventHandler } from "@mjtdev/engine/packages/mjtdev-reacts/dist/hook/addCustomEventListener";
import type {
  AiFunctionCall,
  AppMessage,
  AppMessageMap,
  DataObject,
} from "ai-worker-common";
import { EventEmitter } from "../common/EventEmitter";

export type AiplClientEventMap = AppMessageMap & {
  log: string;
  toast: string;
  ping: string;
  error: unknown;
  message: AppMessage;
  "abort-generation": void;
  "finished-generation": void;
  "new-chat": void;
  "chat-list-updated": void;
  "scroll-message-into-view": string;
  "stop-speaking": void;
  asrUtterance: string;
  asrMumble: string;
  asrAudioWav: ArrayBuffer;
  ttsAudioWav: ArrayBuffer;
  ttsBlobsUpdated: void;
  ttsStopped: void;
  ttsStarted: void;
  asrStarted: void;
  aiResponseFragment: {
    value: string | undefined;
    time: number;
    voiceId?: string;
  };
  ttsBlobReady: string;
  aiFunctionCalled: { name: string; arg: string };
  "return:dataObject": DataObject;
  "function:call": AiFunctionCall;
  dataObjectUpdate: { id: string; value?: DataObject };
  dataLinksUpdated: void;
  "chat:debug": AppMessageMap["chat:debug"];
  "app:performance": AppMessageMap["app:performance"];
  return: AppMessageMap["return"];
  "dataObject:update": AppMessageMap["dataObject:update"];
  "swr:updated": { key: string; data: unknown };
  "asr:response": AppMessageMap["asr:response"];
  aiplEditorUpdate: {
    characterId: string;
    fieldName: string;
    value: string | ((cur: string) => string);
  };
};
export type AppEventType = keyof AiplClientEventMap;

export const EVENTS = new EventEmitter<AiplClientEventMap>();
// addLogListener();
