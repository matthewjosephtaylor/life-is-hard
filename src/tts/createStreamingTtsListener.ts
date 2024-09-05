import { Animates, isNotEmpty } from "@mjtdev/engine";
import { AI_FUNCTION_PREFIX } from "../chat/addFunctionsToChat";
import { detectStopAfter } from "../chat/detectStopAfter";
import { AppEvents } from "../event/AppEvents";
import { sliceTextToFragments } from "./sliceTextToFragments";
import { speak } from "./speak";
import { MIN_TTS_LINE_LENGTH, TTS_LINE_DELIMITERS } from "./textToTtsLines";
import { waitForTtsEnd } from "./waitForTtsEnd";
import { Apps } from "ai-worker-common";

type SpeakingQueueItem = {
  value: string | undefined;
  time: number;
  voiceId: string | undefined;
};
const startSpeakQueue = (signal: AbortSignal) => {
  const queue: SpeakingQueueItem[] = [];
  const workingBuffer: string[] = [];
  let speaking = false;

  // needed so that the last bit of the queue can drain with correct voice
  let curVoiceId: string | undefined = undefined;
  const speakWorkingBuffer = async () => {
    speaking = true;
    const text = workingBuffer.join("");
    await speak({ text, voiceId: curVoiceId });
    workingBuffer.length = 0;
    speaking = false;
  };
  const consumeQueue = async () => {
    if (queue.length === 0) {
      return;
    }
    const next = queue.shift();
    if (!next?.value) {
      if (workingBuffer.length > 0) {
        await speakWorkingBuffer();
      }
      await waitForTtsEnd();
      return;
    }
    // curVoiceId = next.voiceId;
    workingBuffer.push(next.value);
    if (workingBuffer.join("").length < MIN_TTS_LINE_LENGTH) {
      return;
    }
    await speakWorkingBuffer();
  };
  const animator = Animates.create({
    ticker: () => {
      if (signal.aborted) {
        animator.abort = true;
        return;
      }
      if (!speaking) {
        consumeQueue();
      }
    },
  });
  return {
    add: (item: SpeakingQueueItem) => {
      curVoiceId = item.voiceId;
      if (item.value?.includes(AI_FUNCTION_PREFIX)) {
        return;
      }
      queue.push(item);
    },
  };
};

export const createStreamingTtsListener = () => {
  const disposers: (() => void)[] = [];

  let spoken = "";
  let lastFragment = "";
  let lastVoiceId: string | undefined = undefined;
  const totalSpoken: string[] = [];

  const abortController = new AbortController();
  const signal = abortController.signal;
  const queue = startSpeakQueue(signal);

  disposers.push(
    AppEvents.addEventListener("aiResponseFragment", async (event) => {
      if (!event.detail) {
        console.log("createStreamingTtsListener no event detail");
        return;
      }
      const { value, time, voiceId } = event.detail;
      if (!value) {
        console.log("createStreamingTtsListener no event value");
        return;
      }
      if (!voiceId) {
        // Apps.error(
        //   "createStreamingTtsListener:  unable to TTS without voiceId"
        // );
        return;
      }
      lastVoiceId = voiceId;
      lastFragment = value ?? "";

      const unspoken = lastFragment.slice(spoken.length);
      const [stoppedFragment, isStopped] = detectStopAfter(
        unspoken,
        TTS_LINE_DELIMITERS
      );
      if (isStopped && stoppedFragment) {
        const sliced = sliceTextToFragments(unspoken, TTS_LINE_DELIMITERS);
        totalSpoken.push(...sliced);
        sliced.forEach((slice, i) =>
          queue.add({
            value: slice,
            time: time + i,
            voiceId,
          })
        );
        spoken = spoken + unspoken;
      }
    })
  );

  const finisher = () => {
    const unspoken = lastFragment.slice(spoken.length);
    if (isNotEmpty(unspoken)) {
      queue.add({
        time: Date.now(),
        value: unspoken,
        voiceId: lastVoiceId,
      });
    }
    queue.add({
      time: Date.now() + 1, //cheat to make sure proper ordering
      value: undefined,
      voiceId: lastVoiceId,
    });
    spoken = "";
    lastFragment = "";
  };

  const aborter = () => {
    spoken = "";
    lastFragment = "";
  };

  disposers.push(AppEvents.addEventListener("finished-generation", finisher));
  disposers.push(AppEvents.addEventListener("abort-generation", aborter));

  return () => {
    disposers.forEach((d) => d());
    abortController.abort();
  };
};
