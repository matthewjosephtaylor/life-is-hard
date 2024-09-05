import {
  Maths,
  isDefined,
  isUndefined,
  type BabMesh,
  type BabScene,
  type BabSolidParticleSystem,
  type Tick,
} from "@mjtdev/engine";
import { v3 } from "@mjtdev/engine/packages/mjtdev-babs/dist/bab/v3";
import { getCustomAsrState } from "../../../asr-custom/updateCustomAsrState";
import { getTtsState } from "../../../tts/TtsState";
import { isTtsSpeaking } from "../../../tts/isTtsSpeaking";
import { updateParticlesWithAudioContext } from "./updateParticlesWithAudioContext";

export const createVoxTicker = async ({
  scene,
  sps,
  micAudioContext,
  micSource,
}: {
  micAudioContext?: AudioContext;
  micSource?: MediaStreamAudioSourceNode;
  scene: BabScene;
  sps: BabSolidParticleSystem;
}): Promise<(tick: Tick, hack?: boolean) => void> => {
  let speed = 0;
  let opacity = 0.01;
  sps.mesh.visibility = 0;
  let speakerColor = "blue";
  const orbMesh = sps.mesh.parent as BabMesh;

  // const { audioContext: micAudioContext, source: micSource } =
  //   await getMicrophoneInput();

  const ttsAudioContext = getTtsState().audioContext;
  // const ttsAudioContext = audioPlayer.getAudioContext();
  const ttsAnalyzer = ttsAudioContext?.createAnalyser();
  const micAnalyzer = micAudioContext?.createAnalyser();
  if (isDefined(micAnalyzer)) {
    micSource?.connect(micAnalyzer);
  }

  const dataArray = micAnalyzer
    ? new Uint8Array(micAnalyzer.frequencyBinCount / 2)
    : ttsAnalyzer
    ? new Uint8Array(ttsAnalyzer.frequencyBinCount / 2)
    : undefined;

  return (tick: Tick, hack = false) => {
    if (isUndefined(dataArray)) {
      return;
    }
    const ttsSpeaking = isTtsSpeaking();
    const asrSpeaking = getCustomAsrState().speaking;
    const activeSpeaker = ttsSpeaking || asrSpeaking;

    if (activeSpeaker) {
      speakerColor = asrSpeaking ? "blue" : "green";
    }
    const direction = asrSpeaking ? 1 : -1;

    if (activeSpeaker) {
      speed = Maths.lerp(speed, 0.03 * direction, 0.001);
      opacity = Maths.lerp(opacity, 1, 0.1);
    } else {
      speed = Maths.lerp(speed, 0, 0.1);
      opacity = Maths.lerp(opacity, 0, 0.01);
    }
    if (hack) {
      scene.render();
      return;
    }
    sps.mesh.visibility = opacity;
    orbMesh.rotation = v3(
      orbMesh.rotation.x,
      orbMesh.rotation.y + speed,
      orbMesh.rotation.z
    );

    if (activeSpeaker) {
      if (ttsSpeaking) {
        const { currentSource } = getTtsState();
        if (currentSource && ttsAnalyzer) {
          currentSource.connect(ttsAnalyzer);
        }
      }
      const analyzer = asrSpeaking ? micAnalyzer : ttsAnalyzer;
      updateParticlesWithAudioContext({
        particles: sps.particles,
        dataArray,
        analyzer,
        color: speakerColor,
      });
      sps.setParticles();
    }
    scene.render();
  };
};
