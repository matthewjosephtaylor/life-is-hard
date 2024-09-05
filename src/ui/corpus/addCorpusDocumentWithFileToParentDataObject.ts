import { Apps } from "ai-worker-common";
import { AppEvents } from "../../event/AppEvents";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { getAppState } from "../../state/app/AppState";
import { getUserState } from "../../state/user/UserState";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { putRemoteFile } from "./putRemoteFile";

export const addCorpusDocumentWithFileToParentDataObject = async (
  parentId: string,
  file: File
) => {
  const { aiBaseUrl: homeBaseUrl } = getAppState();
  const { authToken } = getUserState();
  if (!authToken || !homeBaseUrl) {
    return Apps.error("no authToken or aiBaseUrl");
  }
  const { name, type: mediaType, size, lastModified } = file;
  // const dataId = uniqueId("data");
  // const bytes = await file.arrayBuffer();
  // console.log(`putting remote data for: ${dataId}`);
  // const resp = await Datas.putRemoteData({
  //   authToken,
  //   homeBaseUrl,
  //   id: dataId,
  //   data: bytes,
  //   options: {
  //     mediaType,
  //   },
  // });
  // if (!resp.ok) {
  //   return AppEvents.dispatchEvent("error", resp);
  // }
  const dataId = await putRemoteFile(file);
  if (!dataId) {
    AppEvents.dispatchEvent("error", "error putting remote file");
    return;
  }

  // create doc
  console.log(`created corpus doc for dataId: ${dataId}`);
  DataObjectStates.upsertDataObject({
    objectType: "corpus-document",
    draft: {
      name,
      dataId,
      mediaType,
      size,
      lastModified,
    },
    parentId,
  });
  // ingest the data

  console.log(`kicking off ingest for: ${dataId}`);
  AppMessagesState.dispatch({
    type: "ingest",
    detail: {
      dataIds: [dataId],
      // enableOcr: true,
      enableOcr: false,
      namespaceId: parentId,
    },
  });
};
