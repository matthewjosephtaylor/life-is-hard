import { Apps, Datas } from "ai-worker-common";
import { getHomeAuth } from "../getHomeAuth";

export const dataIdToBlob = async (dataId: string | undefined) => {
  if (!dataId) {
    return undefined;
  }
  const resp = await Datas.getRemoteData({ id: dataId, ...getHomeAuth() });
  if (!resp) {
    Apps.error(resp);
    return undefined;
  }
  return resp.blob();
};

export const deleteDataId = async (dataId: string | undefined) => {
  if (!dataId) {
    return undefined;
  }
  return Datas.deleteRemoteData({ id: dataId, ...getHomeAuth() });
};

export const putBlob = async ({ id, blob }: { id: string; blob: Blob }) => {
  return await Datas.putRemoteData({
    data: blob,
    id,
    ...getHomeAuth(),
    options: {
      mediaType: blob.type,
    },
  });
};

export const putData = async ({
  id,
  data,
  mediaType,
}: {
  id: string;
  data: BodyInit;
  mediaType?: string;
}) => {
  return Datas.putRemoteData({
    data,
    id,
    ...getHomeAuth(),
    options: { mediaType },
  });
};

export const DatasState = {
  dataIdToBlob,
  deleteDataId,
  putData,
  putBlob,
};
