import { BrowserFiles } from "@mjtdev/engine";
import type { CorpusDocument } from "ai-worker-common";
import { Datas } from "ai-worker-common";
import { getDataObject } from "../../state/data-object/DataObjectStates";
import { getUserState } from "../../state/user/UserState";
import { getAppState } from "../../state/app/AppState";

export const downloadCorpusDocument = async (documentId: string) => {
  const doc = await getDataObject<CorpusDocument>(documentId);
  if (!doc || !doc.dataId) {
    return;
  }
  const { authToken } = getUserState();
  const { aiBaseUrl: homeBaseUrl } = getAppState();
  const resp = await Datas.getRemoteData({
    id: doc.dataId,
    authToken,
    homeBaseUrl,
  });
  const blob = await resp.blob();
  BrowserFiles.writeFileBrowser(doc?.name ?? documentId, blob);
};
