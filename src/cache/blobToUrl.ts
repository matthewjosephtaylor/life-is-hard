import { CLEAR_PIXEL_IMAGE_URL } from "./CLEAR_PIXEL_IMAGE_URL";
import { IMAGE_URL_CACHE } from "./IMAGE_URL_CACHE";

export const blobToUrl = (key: string, blob: Blob | undefined) => {
  if (!blob) {
    return CLEAR_PIXEL_IMAGE_URL;
  }
  return IMAGE_URL_CACHE.get(key, () => URL.createObjectURL(blob));
};


