import { Animates, isNotEmpty } from "@mjtdev/engine";
import { detectStopAfter } from "../chat/detectStopAfter";
import { AppEvents } from "../event/AppEvents";
import { sliceTextToFragments } from "../tts/sliceTextToFragments";
import { AI_FUNCTION_PREFIX } from "../chat/addFunctionsToChat";
import { callAiFunction } from "./callAiFunction";
import type { Chat } from "ai-worker-common";
// import { speak } from "../tts/speak";
// import { waitForTtsEnd } from "../tts/waitForTtsEnd";
// import {
//   MIN_TTS_LINE_LENGTH,
//   TTS_LINE_DELIMITERS,
// } from "../tts/textToTtsLines";

const startAiFunctionTicker = (signal: AbortSignal) => {
  type QueueItem = {
    value: string | undefined;
    time: number;
  };
  const queue: QueueItem[] = [];
  const workingBuffer: string[] = [];
  let speaking = false;
  const speakWorkingBuffer = async () => {
    // console.log(`speaking working buffer: ${workingBuffer.length}`);
    speaking = true;
    // await speak(workingBuffer.join(""));
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
      // await waitForTtsEnd();
      return;
    }
    workingBuffer.push(next.value);
    // if (workingBuffer.join("").length < MIN_TTS_LINE_LENGTH) {
    //   return;
    // }
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
    add: (item: QueueItem) => {
      queue.push(item);
    },
  };
};

export const createStreamingAiFunctionListener = ({
  chat,
  userId,
}: {
  chat: Chat;
  userId: string;
}) => {
  const disposers: (() => void)[] = [];

  let spoken = "";
  let lastFragment = "";

  const abortController = new AbortController();
  const signal = abortController.signal;
  const queue = startAiFunctionTicker(signal);

  disposers.push(
    AppEvents.addEventListener("aiResponseFragment", async (event) => {
      if (!event.detail) {
        return;
      }
      const { value, time } = event.detail;
      if (!value) {
        return;
      }
      lastFragment = value ?? "";

      const unspoken = lastFragment.slice(spoken.length);
      const [stoppedFragment, isStopped] = detectStopAfter(unspoken, [
        ")",
        ";",
      ]);
      if (isStopped && stoppedFragment) {
        if (stoppedFragment.includes(AI_FUNCTION_PREFIX)) {
          console.log("GOT FUNCTION", stoppedFragment);
          callAiFunction({
            chat,
            userId,
            text: stoppedFragment,
          });
        }
        // const sliced = sliceTextToFragments(unspoken, TTS_LINE_DELIMITERS);
        // sliced.forEach((slice, i) =>
        //   queue.add({
        //     value: slice,
        //     time: time + i,
        //   })
        // );
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
      });
    }
    queue.add({
      time: Date.now() + 1, //cheat to make sure proper ordering
      value: undefined,
    });
    spoken = "";
    lastFragment = "";
  };

  disposers.push(AppEvents.addEventListener("finished-generation", finisher));
  disposers.push(AppEvents.addEventListener("abort-generation", finisher));

  return () => {
    disposers.forEach((d) => d());
    abortController.abort();
  };
};
