import { useCustomAsrState } from "../asr-custom/updateCustomAsrState";
import { getAsrState, updateAsrState } from "./AsrState";
import { startAsr } from "./startAsr";

export const unmuffleAsr = async () => {
  const { recorder } = useCustomAsrState();
  if (!recorder) {
    return;
  }
  console.log(`RECORDER STATE: ${recorder.state}`);
  recorder.resumeRecording();

  // const { asrMuffled } = getAsrState();
  // if (!asrMuffled) {
  //   return;
  // }
  // updateAsrState((state) => {
  //   state.asrMuffled = false;
  // });
  // return startAsr();
};
