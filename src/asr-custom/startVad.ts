import { isDefined } from "@mjtdev/engine";
import { MicVAD, utils } from "@ricky0123/vad-web";
import { AppEvents } from "../event/AppEvents";
import { startClientPerf } from "../perf/startClientPerf";
import { ChatStates } from "../state/chat/ChatStates";
import { findContentbaseUrl } from "../state/findContentbaseUrl";
import { getAppModesAndParams } from "../state/location/getAppModesAndParams";
import { interruptTts } from "../tts/custom/interruptTts";
import { isTtsSpeaking } from "../tts/isTtsSpeaking";
import { getMicrophoneInput } from "../ui/chat/entry/getMicrophoneInput";
import {
  getCustomAsrState,
  updateCustomAsrState,
} from "./updateCustomAsrState";

import type { env as ortEnv } from "onnxruntime-web";

export const startVad = async () => {
  console.log("startVad: starting VAD...");
  const { audioContext, source, stream } = await getMicrophoneInput();
  let ignore = false;
  const contentBase = findContentbaseUrl();
  console.log("startVad: contentBase", contentBase);
  const based = (part: string) => {
    return [contentBase, part].filter(isDefined).join("/");
  };
  const vad = await MicVAD.new({
    modelURL: based("vad/silero_vad.onnx"),
    workletURL: based("vad/vad.worklet.bundle.min.js"),
    stream,

    // minSpeechFrames: 50,
    positiveSpeechThreshold: 0.9,
    // negativeSpeechThreshold: 0.01,
    ortConfig: (ort) => {
      console.log("startVad: ortConfig", ort);
      (ort.env as typeof ortEnv).wasm.numThreads = 1;
      (ort.env as typeof ortEnv).wasm.wasmPaths = {
        "ort-wasm-simd.wasm": based("ort/ort-wasm-simd.wasm"),
        "ort-wasm.wasm": based("ort/ort-wasm.wasm"),
        "ort-wasm-simd-threaded.wasm": based("ort/ort-wasm-simd-threaded.wasm"),
        "ort-wasm-threaded.wasm": based("ort/ort-wasm-threaded.wasm"),
      };
    },
    onVADMisfire: () => {
      updateCustomAsrState({ speaking: false });
    },

    onSpeechStart: () => {
      interruptTts("ASR speech start");
      if (getCustomAsrState().muffled) {
        console.log("setupCustomAsr:onSpeechStart: refusing, muffled");
        ignore = true;
        return;
      }
      ignore = false;
      updateCustomAsrState({ speaking: true });
    },

    onSpeechEnd: async (audio) => {
      // console.log("startVad:onSpeechEnd");
      const perf = startClientPerf({
        location: "setupCustomAsr",
      });
      // console.log("setupCustomAsr:onSpeechEnd");
      interruptTts("ASR speech end");
      updateCustomAsrState({ speaking: false });
      // if (!getCustomAsrState().speaking) {
      if (isTtsSpeaking()) {
        console.log(
          "setupCustomAsr:onSpeechEnd dropping audio from ASR as TTS still speaking"
        );
        return;
      }
      if (getCustomAsrState().muffled) {
        console.log("setupCustomAsr:onSpeechEnd: refusing, muffled");
        return;
      }
      if (ignore) {
        console.log("setupCustomAsr:onSpeechEnd: refusing, ignore");
        return;
      }
      const wavBuffer = utils.encodeWAV(audio);
      perf.end(`wavBuffer encoded: ${wavBuffer.byteLength}`);
      // const blob = Bytes.toBlob(wavBuffer, "audio/wav");
      // perf.end(`wavBuffer blobbed: ${blob.size}`);
      const { modes, hashParams } = getAppModesAndParams();
      if (hashParams.tab === "chat" || modes.includes("pap")) {
        // ChatStates.addChatMessage({ audio: blob });
        ChatStates.addChatMessage({
          audio: wavBuffer,
          mediaType: "audio/wav",
          toolConfig: getCustomAsrState().toolConfig,
        });
      }
      AppEvents.dispatchEvent("asrAudioWav", wavBuffer);
    },
  });
  vad.start();
  updateCustomAsrState((s) => {
    s.vad = vad;
    s.enabled = true;
    s.micContext = audioContext;
    s.micSource = source;
    s.micStream = stream;
  });
};
