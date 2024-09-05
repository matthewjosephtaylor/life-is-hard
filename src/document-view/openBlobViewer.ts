import type { CrawlDocument } from "ai-worker-common";
import { AppConstants } from "ai-worker-common";
import { Bytes } from "@mjtdev/engine";
import { openUrlViewer } from "./openUrlViewer";

export const openBlobViewer = async (
  blob: Blob,
  options: Partial<{ title: string }> = {}
) => {
  if (blob.type === AppConstants.CRAWL_DOCUMENT_MEDIA_TYPE) {
    const crawlDocument: CrawlDocument = JSON.parse(await blob.text());
    console.log("cd", [crawlDocument]);
    const { pdf, content } = crawlDocument;
    const pdfAb = Bytes.base64ToArrayBuffer(pdf);
    const pdfBlob = new Blob([pdfAb], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);
    return openUrlViewer(url, options);
  }
  const url = URL.createObjectURL(blob);
  return openUrlViewer(url, options);
};
