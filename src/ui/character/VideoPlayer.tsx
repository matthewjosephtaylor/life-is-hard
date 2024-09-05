import { isUndefined, type ByteLike } from "@mjtdev/engine";
import { useEffect, useRef } from "react";
import { DataImage } from "../image/DataImage";
import { Asrs } from "ai-worker-common";
import {
  getCustomAsrState,
  updateCustomAsrState,
} from "../../asr-custom/updateCustomAsrState";
import { AsrCustoms } from "../../asr-custom/AsrCustoms";

export const VideoPlayer = ({
  video,
  placeholder,
  controls,
  ...rest
}: React.HtmlHTMLAttributes<HTMLVideoElement> & {
  video?: ByteLike;
  placeholder?: ByteLike;
  controls?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    let objectURL: string | null = null;

    if (video instanceof Blob) {
      objectURL = URL.createObjectURL(video);
    } else if (video instanceof ArrayBuffer) {
      const blob = new Blob([video], { type: "video/mp4" });
      objectURL = URL.createObjectURL(blob);
    } else {
      return;
    }

    if (objectURL) {
      videoElement.src = objectURL;
      const asrWasEnabled = getCustomAsrState().enabled;

      AsrCustoms.stopVadAsr().then(() => videoElement.play());
      videoElement.addEventListener("ended", () => {
        if (asrWasEnabled) {
          AsrCustoms.startCustomAsr();
        }
      });

      // videoElement.play();

      return () => {
        videoElement.pause();
        videoElement.src = "";
        if (objectURL) {
          URL.revokeObjectURL(objectURL);
        }
      };
    }
  }, [video]);
  if (isUndefined(video)) {
    return (
      <DataImage
        style={{ maxHeight: "10em", maxWidth: "10em" }}
        bytes={placeholder}
      />
    );
  }

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "auto" }}
        controls={controls}
        {...rest}
      />
    </div>
  );
};
