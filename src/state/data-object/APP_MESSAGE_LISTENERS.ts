import { Bytes, Colors, isDefined, isUndefined, toMany } from "@mjtdev/engine";
import { Ids, type AppMessageMap, type AppObjectType } from "ai-worker-common";
import { AppEvents } from "../../event/AppEvents";
import { audioPlayer } from "../../audio/AudioClipPlayer";
import { fetchTtsAudio } from "../../tts/fetchTtsAudio";
import { updateServiceStatus } from "../../ui/status/ServiceStatus";
import { updateAppState } from "../app/AppState";
import { handleAuthMessage } from "../user/handleAuthMessage";
import { AppMessagesState } from "../ws/AppMessagesState";
import type { AppMessageListener } from "./AppMessageListener";
import { DataObjectStates } from "./DataObjectStates";
import { SwrCaches } from "./SwrCaches";
import { AppModes } from "../location/AppModes";
import { switchWindow } from "../../ui/switchWindow";
import { pcmToWav } from "../../audio/pcmToWav";
import { FormControls } from "../../form-control/FormControls";

export const APP_MESSAGE_LISTENERS: {
  [k in keyof AppMessageMap]: AppMessageListener<k>[];
} = {
  auth: [handleAuthMessage],
  ping: [],
  abort: [],
  "chat:start": [
    (message) => {
      const chat = message.detail;
      if (isDefined(chat?.id)) {
        AppModes.upsertHashParam("chatId", chat.id);
        switchWindow("chat");
      } else {
        console.log("got empty chat, unsetting chatId ");
        AppModes.removeHashParam("chatId");
      }
    },
  ],
  "chat:addMessage": [],
  "dataObject:sub": [],
  "dataObject:unsub": [],
  "dataObject:update": [
    (message) => {
      const dataObjects = toMany(message.detail);
      dataObjects.forEach((dataObject) => {
        // AppEvents.dispatchEvent("dataObject:update", message.detail);
        // console.log(`dataObject:update: setting dataobject ${dataObject.id}`)
        DataObjectStates.setDataObject(dataObject);
      });
    },
  ],
  "dataObject:murmur": [
    (message) => {
      const dataObjects = toMany(message.detail);

      const firstObjectIdParsed = Ids.parseId(dataObjects[0].id);
      if (isUndefined(firstObjectIdParsed)) {
        return;
      }
      const { type } = firstObjectIdParsed;
      SwrCaches.updateSwrCache({
        dataObjects: dataObjects,
        objectType: type as AppObjectType,
      });
    },
  ],
  "dataObject:delete": [
    (message) => {
      const dataObjectIds = toMany(message.detail);
      dataObjectIds.forEach((id) => DataObjectStates.forgetDataObject(id));
    },
  ],
  "dataLink:upsert": [
    (message) => {
      const link = message.detail;
      console.warn("deprecated dataLink:upsert", link);
      // DataObjectStates.setDataLink(link);
    },
  ],
  "dataLink:delete": [
    (message) => {
      DataObjectStates.forgetDataLink(message.detail);
    },
  ],
  "dataLink:find": [],
  messages: [],
  tts: [
    async (message) => {
      const { detail } = message;
      const { text, voiceId } = detail;
      if (!voiceId || !text || text.length === 0) {
        return;
      }

      const response = await fetchTtsAudio({ text, voiceName: voiceId });
      if (!response || !response.ok) {
        AppEvents.dispatchEvent("error", response);
        return;
      }
      const blob = await response.blob();
      const ab = await Bytes.toArrayBuffer(blob);
      audioPlayer.enqueueAudioClip(ab);
    },
  ],
  "tts:finished": [
    (message) => {
      AppEvents.dispatchEvent("finished-generation");
    },
  ],
  ingest: [],
  "vector:deleteNamespace": [],
  "corpusDocument:delete": [],
  toast: [
    (message) => {
      console.log(`toasting`, message.detail);
      AppEvents.dispatchEvent("toast", message.detail);
    },
  ],
  "chat:phone": [],
  log: [
    (message) => {
      const logLevelColors = {
        trace: Colors.from("cyan").toString(),
        debug: Colors.from("green").lighten(0.5).toString(),
        info: Colors.from("yellow").toString(),
        error: Colors.from("red").toString(),
      };
      // console.log(safe(() => JSON.parse(message.detail)));
      const { message: text, level, extra, stack } = message.detail;
      const color = logLevelColors[level ?? "info"];
      if (level === "error") {
        console.log(`%c${text}`, `color: ${color}`, { extra, stack });
        AppEvents.dispatchEvent("error", message.detail);
        return;
      }
      if (extra) {
        console.log(`%c${text}`, `color: ${color}`, extra);
        // console.log(text, extra);
      } else {
        console.log(`%c${text}`, `color: ${color}`);
        // console.log(text);
      }
    },
  ],
  "dataObject:find": [],
  "service:state": [
    (message) => {
      const { service, state } = message.detail;
      // console.log(`ServiceStatus update: ${service}: ${state}`);
      updateServiceStatus((s) => {
        s.services[service] = state;
      });
    },
  ],
  access: [],
  "chat:startPublicAgent": [],
  "dataObject:findAllByObjectType": [],
  webCrawl: [],
  "user:create": [],
  "user:delete": [],
  "return:dataObject": [
    (message) => {
      AppEvents.dispatchEvent("return:dataObject", message.detail);
    },
  ],
  "chat:ask": [],
  "function:call": [
    (message) => {
      console.log("browser received function call", { message });
      AppEvents.dispatchEvent("function:call", message.detail);
    },
  ],
  "chat:debug": [
    (message) => {
      AppEvents.dispatchEvent("chat:debug", message.detail);
    },
  ],
  "chat:insertMessage": [],
  "chat:deleteMessage": [],
  "tts:elevenlabs:result": [
    async (message) => {
      const { audio, mediaType } = message.detail;
      if (isUndefined(audio)) {
        return;
      }
      const rawData = Bytes.base64ToArrayBuffer(audio);
      const wav = mediaType.startsWith("audio/L16")
        ? pcmToWav(rawData, 24000)
        : rawData;

      AppEvents.dispatchEvent("ttsAudioWav", wav.slice(0));
      audioPlayer.enqueueAudioClip(wav);
    },
  ],
  "appInterface:update": [
    (message) => {
      const { gisClientId, appInterfaceId } = message.detail;
      updateAppState((s) => {
        if (appInterfaceId) {
          s.appInterfaceId = appInterfaceId;
        }
        if (gisClientId) {
          s.gisClientId = gisClientId;
        }
      });
    },
  ],
  "image:generate": [],
  "user:changePassword": [],
  "message:chunk": [],
  "tts:say": [],
  "stat:get": [],
  "appInterface:ready": [],
  "app:upgrade": [],
  "chat:reInferMessage": [],
  "chat:end": [],
  "dataObject:update:accessInfo": [
    (message) => {
      const accessInfos = toMany(message.detail);
      accessInfos.forEach((ai) => DataObjectStates.setAccessInfo(ai));
    },
  ],
  "app:setAlarm": [],
  "app:performance": [
    (message) => {
      AppEvents.dispatchEvent("app:performance", message.detail);
    },
  ],
  return: [(message) => AppEvents.dispatchEvent("return", message.detail)],
  "dataObject:get": [],
  "dataObject:getByType": [],
  "dataObject:getChildren": [],
  "dataObject:updateChildren": [
    (message) => {
      console.log(
        "dataObject:updateChildren ----------IGNORING!!!!",
        message.detail
      );
      // const { children, key, objectType, parentId } = message.detail;
      // SwrCaches.updateSwrCache({
      //   parentId,
      //   key,
      //   objectType,
      //   dataObjects: children,
      //   nonce: "",
      // });
    },
  ],
  "app:group:create": [],
  "dataObject:query": [],
  "dataObject:query:getKeys": [
    (message) => {
      // console.log("dataobject:query:getKeys!!!!!");
      AppMessagesState.dispatch({
        type: "dataObject:query:setKeys",
        detail: SwrCaches.getKeys(),
      });
    },
  ],
  "dataObject:query:setKeys": [],
  "dataObject:swr:setDataForKey": [
    (message) => {
      const { data, swrKey } = message.detail;
      // console.log(`dataobject:swr:setDataForKey: ${swrKey}`, data);
      // SwrCaches.mutateSwrCache(swrKey, data);
      SwrCaches.mutateSwrCache(swrKey);
    },
  ],
  "app:invalidateCaches": [
    () => {
      console.warn("APP_MESSAGE_LISTENERS: refusing to invalidate caches");
      // SwrCaches.invalidateEntireSwrCache();
    },
  ],
  "app:group:activate": [],
  "app:sessions:list": [],
  "app:sessions:reset": [],
  "dataObject:query:invalidate": [],
  "app:time": [],
  "app:debug:set": [],
  "asr:audio2txt": [],
  "asr:response": [],
  "app:metrics:get": [],
  "app:metrics:reset": [],
  "app:metrics:result": [],
  "image:response": [],
  "tts:txt2audio": [],
  "lipsync:request": [],
  "lipsync:response": [],
  "dataObject:get:accessInfo": [],
  "app:su": [],
  play: [],
  "aipl:getAvailableTransforms": [],
  "aipl:getAvailableTransforms:response": [],
  "aipl:exec": [],
  "playground:createAssistant": [],
  "playground:createAssistant:result": [],
  "playground:suAssistant": [],
  "playground:updateAssistant": [],
  "playground:deleteAssistant": [],
  "playground:search": [],
  "client:formUpdate": [
    (mesage) => {
      AppEvents.dispatchEvent("client:formUpdate", mesage.detail);
      FormControls.updateForm(mesage.detail.data, mesage.detail.config);
    },
  ],
  "client:aiplComponentUpdate": [
    (mesage) => {
      AppEvents.dispatchEvent("client:aiplComponentUpdate", mesage.detail);
    },
  ],
  "pap:auth": [],
  stream: [(message) => AppEvents.dispatchEvent("stream", message.detail)],
  "app:reset": [],
};
