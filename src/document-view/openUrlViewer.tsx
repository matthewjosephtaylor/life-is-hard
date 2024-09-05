import { closeAppPopup } from "../ui/popup/closeAppPopup";
import { openAppPopup } from "../ui/popup/openAppPopup";
import { UrlViewerPopup } from "./UrlViewerPopup";

export const openUrlViewer = (
  url: string,
  options: Partial<{ title: string }> = {}
) => {
  const { title } = options;
  return openAppPopup(
    <UrlViewerPopup title={title} src={url} onSubmit={() => closeAppPopup()} />
  );
};
