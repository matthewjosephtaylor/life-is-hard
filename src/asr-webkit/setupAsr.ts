import { last } from "@mjtdev/engine";
import { AppEvents } from "../event/AppEvents";
import { useTtsState } from "../tts/TtsState";
import { isTtsSpeaking } from "../tts/isTtsSpeaking";
import { getAsrState, updateAsrState } from "./AsrState";
import { muffleAsr } from "./muffleAsr";
import { speechRecognitionResultsToUtterances } from "./speechRecognitionResultsToTranscript";
import { unmuffleAsr } from "./unmuffleAsr";

export const setupAsr = (restart: boolean = false) => {
  console.log("setting up ASR");
  const { speechRecognition } = getAsrState();
  if (speechRecognition && !restart) {
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = true;
  updateAsrState((state) => {
    state.currentSession = crypto.randomUUID();
    state.sessions.push({
      id: state.currentSession,
      utterances: [],
    });
    state.speechRecognition = recognition;
  });

  useTtsState.subscribe((s) => {
    if (s.currentSource) {
      muffleAsr();
      return;
    }
    if (!isTtsSpeaking()) {
      unmuffleAsr();
    }
  });

  recognition.onresult = (event) => {
    // in theory this should never happen, in practice...
    if (isTtsSpeaking()) {
      muffleAsr();
      return;
    }
    const { results } = event;
    const utterances = speechRecognitionResultsToUtterances(results);
    updateAsrState((state) => {
      const { currentSession, sessions } = state;
      const sessionIdx = sessions.findIndex((s) => s.id === currentSession);
      const session = sessions[sessionIdx];
      session.utterances = utterances;
      const lastUtterance = last(utterances);
      if (lastUtterance?.isFinal) {
        if (isTtsSpeaking()) {
          return;
        }
        AppEvents.dispatchEvent("asrUtterance", lastUtterance.text);
      } else {
        AppEvents.dispatchEvent("asrMumble", lastUtterance?.text);
      }
    });
  };
  recognition.onend = (event) => {
    setTimeout(() => {
      updateAsrState((state) => {
        if (!state.asrActive) {
          return;
        }
        state.currentSession = crypto.randomUUID();
        state.sessions.push({
          id: state.currentSession,
          utterances: [],
        });
        recognition.start();
      });
    }, 10);
  };

  recognition.onerror = (event) => {
    // console.log(event);
    // AppEvents.dispatchEvent("error", event);
  };
};
