import { AppEvents } from "../../event/AppEvents";
import { getActiveProfile } from "../../state/user/getActiveProfile";
import { DEFAULT_ASR_CONFIG } from "../DEFAULT_ASR_CONFIG";

export const unmuffleAsrForMomentAndStopSpeakingIfUserSpeaks = async ({
  text,
  pauseMs = getActiveProfile()?.asrConfig?.pauseToListenMs ??
    DEFAULT_ASR_CONFIG.pauseToListenMs,
}: {
  text: string;
  pauseMs?: number;
}): Promise<boolean> => {
  // let text = "";
  return new Promise<boolean>((resolve, reject) => {
    let resolved = false;
    const disposers: (() => void)[] = [];
    disposers.push(
      AppEvents.once("asrMumble", () => {
        if (resolved) {
          return;
        }
        // interruptTts();
        resolved = true;
        resolve(true);
      })
    );

    disposers.push(
      AppEvents.once("asrUtterance", () => {
        if (resolved) {
          return;
        }
        // interruptTts();
        resolved = true;
        resolve(true);
      })
    );

    const disposAll = () => disposers.forEach((d) => d());
    setTimeout(async () => {
      if (resolved) {
        disposAll();
        return;
      }
      disposAll();
      resolved = true;
      resolve(false);
    }, pauseMs);
  });
};
