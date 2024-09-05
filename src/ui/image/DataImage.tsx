import { Bytes, Caches, isDefined, type ByteLike } from "@mjtdev/engine";
import { Datas } from "ai-worker-common";
import { useEffect, useRef } from "react";
import { useAppState } from "../../state/app/AppState";
import { useUserState } from "../../state/user/UserState";

const DATA_IMAGE_CACHE =
  Caches.create<Promise<string | undefined>>("data-image");

export const DataImage = (
  props: Partial<React.ImgHTMLAttributes<HTMLImageElement>> & {
    bytes?: ByteLike;
    dataId?: string;
  }
) => {
  const ref = useRef<HTMLImageElement>(null);
  const { authToken } = useUserState();
  const { aiBaseUrl: homeBaseUrl } = useAppState();
  const { dataId, bytes, ...rest } = props;
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (dataId) {
      DATA_IMAGE_CACHE.get(dataId, async () => {
        try {
          const resp = await Datas.getRemoteData({
            id: dataId,
            authToken,
            homeBaseUrl,
          });
          if (!resp.ok) {
            throw new Error(`unable to get remote data for image: ${dataId}`);
          }
          return URL.createObjectURL(await resp.blob());
        } catch (error) {
          console.log(`error fetching image: ${dataId} `, error);
          return;
        }
      })?.then((objectUrl) => {
        if (ref.current && objectUrl) {
          ref.current.src = objectUrl;
        }
      });
      return;
    }
    if (isDefined(bytes)) {
      const blob = Bytes.toBlob(bytes, "img/png");
      ref.current.src = URL.createObjectURL(blob);
    }
    if (props.src) {
      ref.current.src = props.src;
    }
    return;
  }, [ref, dataId, authToken, homeBaseUrl, props.src, bytes]);

  return <img ref={ref} {...rest} />;
};
