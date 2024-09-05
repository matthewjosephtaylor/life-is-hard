import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { openFormEditorPopup } from "../form/openFormEditorPopup";

export const openWebCrawler = async (parentId: string) => {
  const resp = await openFormEditorPopup<{
    url: string;
    maxRequestsPerCrawl: string;
  }>(
    {
      url: "https://www.example.com",
      maxRequestsPerCrawl: "1",
    },
    {
      fieldStyles: { url: { width: "20em" } },
    }
  );
  if (!resp) {
    return;
  }
  let { url = "", maxRequestsPerCrawl = "20" } = resp;
  if (url.trim().length === 0) {
    return;
  }

  url = url.startsWith("http") ? url : `https://${url}`;

  AppMessagesState.dispatch({
    type: "webCrawl",
    detail: {
      parentId,
      url,
      maxRequestsPerCrawl: Number(maxRequestsPerCrawl),
    },
  });
};
