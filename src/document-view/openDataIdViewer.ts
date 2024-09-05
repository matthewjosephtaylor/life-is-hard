import { AppEvents } from "../event/AppEvents";
import { DatasState } from "../state/data/DatasState";
import { openBlobViewer } from "./openBlobViewer";

export const openDataIdViewer = async (
  document: Partial<{ dataId: string }>,

  options: Partial<{ title: string }> = {}
) => {
  const { dataId } = document;
  if (!dataId) {
    return;
  }

  const blob = await DatasState.dataIdToBlob(dataId);
  if (!blob) {
    return AppEvents.dispatchEvent(
      "error",
      `openDataIdViewer: No blob for: ${dataId}`
    );
  }
  return openBlobViewer(blob, options);
};
