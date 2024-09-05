import { useEffect, useState } from "react";
import { CLEAR_PIXEL_IMAGE_URL } from "./CLEAR_PIXEL_IMAGE_URL";

export const useImageBlobUrl = (blob: Blob | undefined) => {
  const [url, setUrl] = useState<string>(CLEAR_PIXEL_IMAGE_URL);
  useEffect(() => {
    if (!blob) {
      return;
    }
    const url = URL.createObjectURL(blob);
    setUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [blob]);

  return url;
};
