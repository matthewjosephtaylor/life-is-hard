import { getChatVoiceId } from "../speak";

export const pushUmToTtsQueue = (
  voiceId: string | undefined = getChatVoiceId()
) => {
  return;
  // console.log("pushing um to tts queue!!!!!!!!!!!!!!!!!!!!!");
  // if (!voiceId) {
  //   return;
  // }
  // const { voiceIdToUmBlobs } = getVoiceSampleState();
  // const blobs = voiceIdToUmBlobs[voiceId];
  // if (!blobs) {
  //   console.log(`no ums for: ${voiceId}`);
  // }
  // let startedSpeaking = getCustomTtsState().audioClips.length > 0;
  // if (startedSpeaking) {
  //   return;
  // }

  // const text = "um";

  // const blob = Randoms.pickRandom(blobs);
  // if (!blob) {
  //   console.log("no um blobs");
  //   return;
  // }
  // // const unsub = useCustomTtsState.subscribe((s) => {
  // //   startedSpeaking =
  // //     s.audioClips
  // //       .filter((ac) => isDefined(ac.blob))
  // //       .filter((ac) => ac.blob !== blob).length > 0;
  // //   if (startedSpeaking) {
  // //     console.log("startedSpeaking, no more umming", s.audioClips.length);
  // //     unsub();
  // //     // clean up any ums on the queue
  // //     updateCustomTtsState((state) => {
  // //       state.audioClips = state.audioClips.filter((c) => c.blob !== blob);
  // //     });
  // //   }
  // // });

  // // setTimeout(() => {
  // //   pushBlobToQueue({ text, blob });
  // // }, 500);
  // // const umPusher = async () => {
  // //   console.log("umpushing...");
  // //   if (startedSpeaking) {
  // //     console.log("killing umPusher, started speaking");
  // //     return;
  // //   }
  // //   if (!startedSpeaking) {
  // //     // await waitForCustomTtsEnd();
  // //     if (
  // //       isDefined(getCustomTtsState().audioClips.find((ac) => ac.id === clipId))
  // //     ) {
  // //       console.log("still umming", getCustomTtsState().audioClips);
  // //       setTimeout(umPusher, 500);
  // //       return;
  // //     }
  // //     // await playAudioBlob(blob);
  // //     clipId = pushBlobToQueue({ text, blob });
  // //     console.log("umClipId", clipId);
  // //     console.log("pushing next um");
  // //     setTimeout(umPusher, 500);
  // //   }
  // // };
  // // // umPusher();
  // // setTimeout(umPusher, 500);
};
