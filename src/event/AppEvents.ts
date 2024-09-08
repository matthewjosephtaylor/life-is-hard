import { Reacts } from "@mjtdev/engine";
import type { CustomEventHandler } from "@mjtdev/engine/packages/mjtdev-reacts/dist/hook/addCustomEventListener";
import type {
  AiFunctionCall,
  AppMessage,
  AppMessageMap,
  DataObject,
} from "ai-worker-common";

export type AppEventMap = {
  log: string;
  toast: AppMessageMap["toast"];
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
  stream: AppMessageMap["stream"];
  "dataObject:update": AppMessageMap["dataObject:update"];
  "swr:updated": { key: string; data: unknown };
  "asr:response": AppMessageMap["asr:response"];
  aiplEditorUpdate: {
    characterId: string;
    fieldName: string;
    value: string | ((cur: string) => string);
  };
  "client:formUpdate": AppMessageMap["client:formUpdate"];
  "client:aiplComponentUpdate": AppMessageMap["client:aiplComponentUpdate"];
  "client:standbyNotice": AppMessageMap["client:standbyNotice"];
};

export type AppEventType = keyof AppEventMap;

const dispatchEvent = <ET extends keyof AppEventMap>(
  eventType: ET,
  payload?: AppEventMap[ET]
) => {
  Reacts.dispatchCustomEvent(eventType, payload);
};

const addEventListener = <ET extends keyof AppEventMap>(
  eventType: ET,
  handler: CustomEventHandler<AppEventMap[ET]>
) => {
  return Reacts.addCustomEventListener(eventType, handler);
};

const once = <ET extends keyof AppEventMap>(
  eventType: ET,
  handler: CustomEventHandler<AppEventMap[ET]>
) => {
  const disposer = addEventListener(eventType, (evt) => {
    disposer();
    handler(evt);
  });
  return disposer;
};

const useEventListener = <ET extends keyof AppEventMap>(
  eventType: ET,
  action: (e: CustomEvent<AppEventMap[ET]>) => void,
  deps: React.DependencyList = []
) => {
  return Reacts.useCustomEventListener(eventType, action, { deps });
};

export const AppEvents = {
  addEventListener,
  useEventListener,
  dispatchEvent,
  once,
};
