import { useCustomAsrState } from "../asr-custom/updateCustomAsrState";

export const muffleAsr = async () => {
  const { recorder } = useCustomAsrState();
  console.log("muffleAsr", { recorder });
  if (!recorder) {
    return;
  }
  recorder.pauseRecording();

  // TODO re-integrate browser ASR?
  // await stopAsr();
  // updateAsrState((state) => {
  //   state.asrMuffled = true;
  // });
};
