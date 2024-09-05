import { Bytes } from "@mjtdev/engine";
import {
  Datas,
  uniqueId
} from "ai-worker-common";
import { AppEvents } from "../../../../event/AppEvents";
import { getAppState } from "../../../../state/app/AppState";
import { getUserState } from "../../../../state/user/UserState";


export const b64ToImageId = async (b64: string) => {
  const bytes = Bytes.base64ToArrayBuffer(b64);
  const { authToken } = getUserState();
  const { aiBaseUrl: homeBaseUrl } = getAppState();
  const id = uniqueId("data");
  const resp = await Datas.putRemoteData({
    homeBaseUrl,
    authToken,
    data: bytes,
    id,
  });
  if (!resp.ok) {
    AppEvents.dispatchEvent("error", resp);
    return undefined;
  }
  return id;
};
