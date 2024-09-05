import type { AppVoice } from "ai-worker-common";
import { Apps, Datas } from "ai-worker-common";
import { AppEvents } from "../../event/AppEvents";
import { getAppState } from "../../state/app/AppState";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { getUserState } from "../../state/user/UserState";
import { pushTtsCloningSample } from "../../tts/pushTtsCloningSample";
import {
  getVoiceSampleState,
  updateVoiceSampleState,
} from "./updateVoiceSampleState";

export const pushVoiceSample = async (
  voiceId: string | undefined,
  force = false
) => {
  const { id: userId } = getUserState();
  if (!userId) {
    return;
  }
  if (!voiceId) {
    return;
  }
  const voice = DataObjectStates.getDataObject<AppVoice>(voiceId);
  if (!voice) {
    return AppEvents.dispatchEvent("error", `No voice: ${voiceId}`);
  }

  const documents = await DataObjectStates.getChildDataObjects(
    voiceId,
    "corpus-document"
  );

  // const idx = DataIndexesStates.getDataIndexState<CorpusDocument>(
  //   voice.corpusDocumentIdxId
  // );
  // if (!idx) {
  //   return AppEvents.dispatchEvent(
  //     "error",
  //     `No corpusDocumentIdx: ${voice.corpusDocumentIdxId}`
  //   );
  // }
  const corpusDocument = documents[0];
  if (!corpusDocument) {
    return;
  }
  const dataId = corpusDocument.dataId;
  if (!dataId) {
    return;
  }

  const { pushed } = getVoiceSampleState();
  if (pushed.includes(dataId) && !force) {
    return;
  }

  const { aiBaseUrl: homeBaseUrl } = getAppState();
  const { authToken } = getUserState();
  if (!authToken) {
    return Apps.error("pushVoiceSample: no authToken");
  }
  const dataResp = await Datas.getRemoteData({
    id: dataId,
    authToken,
    homeBaseUrl,
  });
  if (!dataResp.ok) {
    return AppEvents.dispatchEvent("error", dataResp);
  }
  const blob = await dataResp.blob();

  const pushResp = await pushTtsCloningSample(voiceId, blob);
  if (!pushResp.ok) {
    return AppEvents.dispatchEvent("error", pushResp);
  }
  updateVoiceSampleState((state) => {
    state.pushed.push(dataId);
  });
};
