import { Datas, uniqueId } from "ai-worker-common";
import { AppEvents } from "../../event/AppEvents";
import { getAppState } from "../../state/app/AppState";
import { getUserState } from "../../state/user/UserState";


export const putRemoteFile = async (file: File) => {
  const { aiBaseUrl: homeBaseUrl } = getAppState();
  const { authToken } = getUserState();
  const { name, type: mediaType, size, lastModified } = file;
  const dataId = uniqueId("data");
  const bytes = await file.arrayBuffer();
  console.log(`putting remote data for: ${dataId}`);
  const resp = await Datas.putRemoteData({
    authToken,
    homeBaseUrl,
    id: dataId,
    data: bytes,
    options: {
      mediaType,
    },
  });
  if (!resp.ok) {
    AppEvents.dispatchEvent("error", resp);
    return undefined;
  }
  return dataId;
};
