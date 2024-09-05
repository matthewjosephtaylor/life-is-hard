import type { CloudflareAiChunkResponse, OpenAiTextResponse } from "@mjtdev/engine";
import type { Chat} from "ai-worker-common";
import { Chats } from "ai-worker-common";
import { AppEvents } from "../event/AppEvents";
import { decodeAiResponse } from "./decodeAiResponse";
import { detectStop } from "./detectStop";
import { detectStopAfter } from "./detectStopAfter";

export const createAiResponseMessageUpdaterConsumer =
  ({
    chat,
    messageId,
    stop,
    stopAfter,
    buffer = [],
  }: {
    chat: Chat;
    messageId: string;
    stop: string[];
    stopAfter: string[];
    buffer?: string[];
  }) =>
  (
    resp: OpenAiTextResponse | CloudflareAiChunkResponse | undefined,
    done: boolean
  ) => {
    AppEvents.dispatchEvent("scroll-message-into-view", messageId);
    if (done) {
      AppEvents.dispatchEvent("aiResponseFragment", {
        value: undefined,
        time: Date.now(),
      });
    }
    const text = decodeAiResponse(resp);
    if (!text) {
      // saveChatState();
      return;
    }

    buffer.push(text);
    const bufferText = buffer.join("");
    const [fullStoppedTextFragment, fullStopped] = detectStop(bufferText, stop);
    const [afterStoppedTextFragment, afterStopped] = detectStopAfter(
      fullStoppedTextFragment,
      stopAfter
    );

    AppEvents.dispatchEvent("aiResponseFragment", {
      value: afterStoppedTextFragment,
      time: Date.now(),
    });

    if (afterStoppedTextFragment) {
      Chats.updateChatMesasgeText({
        messageId,
        chat,
        updater: () => afterStoppedTextFragment,
      });
    }
    if (fullStopped || afterStopped) {
      // saveChatState();
      return true;
    }
    return false;
  };
