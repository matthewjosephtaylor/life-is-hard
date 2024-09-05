import { CorpusDocument, Datas } from "ai-worker-common";
import { AppEvents } from "../../event/AppEvents";
import {
  DataObjectStates,
  getDataObject,
} from "../../state/data-object/DataObjectStates";
import { getUserState } from "../../state/user/UserState";
import { getAppState } from "../../state/app/AppState";
import { AppMessagesState } from "../../state/ws/AppMessagesState";

export const deleteCorpusDocument = async (documentId: string) => {
  return DataObjectStates.deleteDataObject(documentId)
  // AppMessagesState.dispatch({
  //   type: "corpusDocument:delete",
  //   detail: documentId,
  // });
  // const doc = getDataObject<CorpusDocument>(documentId);
  // if (!doc) {
  //   return AppEvents.dispatchEvent("error", `No document: ${documentId}`);
  // }
  // const { dataId } = doc;

  // // remove the data if it exists
  // if (dataId) {
  //   const { authToken } = getUserState();
  //   const { aiBaseUrl: homeBaseUrl } = getAppState();
  //   const resp = await Datas.deleteRemoteData({
  //     id: dataId,
  //     authToken,
  //     homeBaseUrl,
  //   });
  //   if (!resp.ok) {
  //     return AppEvents.dispatchEvent("error", resp);
  //   }
  // }
  // return DataObjectStates.deleteDataObject(documentId);
};
