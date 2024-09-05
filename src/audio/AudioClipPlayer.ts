import { isDefined, isUndefined } from "@mjtdev/engine";
import { AppEvents } from "../event/AppEvents";
import { getTtsState, updateTtsState, useTtsState } from "../tts/TtsState";
import { requestSpeakerAccess } from "../tts/requestSpeakerAccess";
import { releaseSpeakerAccess } from "./releaseSpeakerAccess";
import { toast } from "../tts/custom/toast";

export class AudioClipPlayer {
  // private audioContext: AudioContext | undefined;
  private audioClipQueue: ArrayBuffer[];
  private isPlaying: boolean;

  constructor() {
    this.audioClipQueue = [];
    this.isPlaying = false;
  }

  async start() {
    const ctx = await requestSpeakerAccess();
    updateTtsState((s) => {
      s.audioContext = ctx;
    });
    console.log("enabled AudioClipPlayer!!!!!!!!!!!!!!!!!!");
    return isDefined(ctx);
  }

  async stop() {
    console.log("disabled AudioClipPlayer");
    const ctx = getTtsState().audioContext;
    if (isDefined(ctx)) {
      await releaseSpeakerAccess(ctx);
      updateTtsState((s) => {
        s.audioContext = undefined;
      });
    }
  }

  public enqueueAudioClip(arrayBuffer: ArrayBuffer): void {
    this.audioClipQueue.push(arrayBuffer);

    if (!this.isPlaying) {
      this.playNextClip();
    }
  }

  public interrupt(): void {
    this.audioClipQueue.length = 0;
    const { currentSource } = getTtsState();

    if (currentSource) {
      currentSource.stop();
    }
  }

  private async playNextClip(): Promise<void> {
    if (this.audioClipQueue.length === 0) {
      updateTtsState((s) => {
        s.currentSource = undefined;
      });
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;
    const arrayBuffer = this.audioClipQueue.shift();
    if (!arrayBuffer) {
      throw new Error("Unexpected empty audio clip queue");
    }
    const { audioContext } = getTtsState();
    if (isUndefined(audioContext)) {
      console.warn(
        "AudioClipPlayer: refusing to playNextClip, no audioContext"
      );
      return;
    }

    audioContext
      .decodeAudioData(arrayBuffer)
      .then((audioBuffer) => {
        if (isUndefined(audioContext)) {
          toast(
            "AudioClipPlayer: refusing to play decoded audio, no audioContext"
          );
          console.warn(
            "AudioClipPlayer: refusing to play decoded audio, no audioContext"
          );
          return;
        }
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        updateTtsState((s) => {
          s.currentSource = source;
        });

        source.connect(audioContext.destination);
        source.start(audioContext.currentTime);

        source.onended = async () => {
          source.buffer = null;
          this.playNextClip();
        };
      })
      .catch((error) => {
        toast("AudioClipPlayer: error decoding audio");
        AppEvents.dispatchEvent("error", error);
        updateTtsState((s) => {
          s.currentSource = undefined;
        });
        this.isPlaying = false;
        console.error("Error decoding audio data", error);
        // this.playNextClip();
      });
  }
}

export const audioPlayer = new AudioClipPlayer();
