import { Asrs, Fetches } from "ai-worker-common";
import { AppEvents } from "../event/AppEvents";
import { getAppState } from "../state/app/AppState";
import { getUserState } from "../state/user/UserState";
// import { toStandardAsrResult } from "./AsrResult";
import { Bytes } from "@mjtdev/engine";

export const blobToAsrResult = async (blob: Blob) => {
  const { aiBaseUrl: homeBaseUrl } = getAppState();
  const { authToken } = getUserState();
  // const formData = new FormData();
  // formData.append("audio_file", blob);

  const url = `${homeBaseUrl}/cf/asr`;
  const b64 = await Bytes.toBase64(blob);
  // AppMessagesState.dispatch({

  // })

  // const resp = await Fetches.fetchWithAuth({
  //   url,
  //   authToken,
  //   data: b64,
  //   options: {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   },
  // });
  // if (!resp.ok) {
  //   console.error(resp);
  //   AppEvents.dispatchEvent("error", resp);
  //   throw resp;
  // }
  // const json = await resp.json();
  // console.log("blobToAsrResult", { json });

  // return toStandardAsrResult(json);
};

export const blobToCustomAsrResult = async (blob: Blob) => {
  try {
    blobToAsrResult(blob);
  } catch (err) {
    console.log(err);
  }
  const { aiBaseUrl: homeBaseUrl } = getAppState();
  const { authToken } = getUserState();
  const formData = new FormData();
  formData.append("audio_file", blob);

  const url = `${homeBaseUrl}/gate/asr?encode=true&task=transcribe&word_timestamps=false&output=json&language=en`;

  const resp = await Fetches.fetchWithAuth({
    url,
    authToken,
    data: formData,
    options: {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    },
  });
  if (!resp.ok) {
    console.error(resp);
    AppEvents.dispatchEvent("error", resp);
    throw resp;
  }
  const json = await resp.json();

  return Asrs.toStandardAsrResult(json);
};
