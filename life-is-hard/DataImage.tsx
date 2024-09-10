import { Bytes, isUndefined } from "@mjtdev/engine";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";
import { createImageGenPromptFromContext } from "./createImageGenPromptFromContext";
import type { GameImage } from "./state/GameImage";
import type { SdApiTxt2ImgRequest } from "ai-worker-common";

export const DataImage = ({
  src,
  bytes,
  request,
  onChange = () => {},
}: Partial<{
  bytes: ArrayBuffer;
  src: string;
  request: Partial<SdApiTxt2ImgRequest>;
  onChange: (bytes: ArrayBuffer, request: Partial<SdApiTxt2ImgRequest>) => void;
}>) => {
  const [state, setState] = useState({
    bytes: undefined as undefined | ArrayBuffer,
    showGenerateButton: false,
    loading: false,
    src: undefined as undefined | string,
    imageGenRequest: undefined as undefined | GameImage["request"],
    promptRequest: undefined as
      | undefined
      | ReturnType<typeof createImageGenPromptFromContext>,
  });
  const ctx = useAiplComponentContext();
  useEffect(() => {
    setState((s) => ({ ...s, src }));
  }, [src]);

  useEffect(() => {
    setState((s) => ({ ...s, bytes }));
  }, [bytes]);
  useEffect(() => {
    setState((s) => ({ ...s, imageGenRequest: request }));
  }, [request]);

  useEffect(() => {
    const prompt = createImageGenPromptFromContext(ctx);
    setState((s) => ({ ...s, promptRequest: prompt }));
  }, [ctx]);

  useEffect(() => {
    if (isUndefined(state.bytes)) {
      return;
    }
    const src = URL.createObjectURL(
      new Blob([state.bytes], { type: "image/png" })
    );
    console.log("setting src", src);
    setState((s) => ({ ...s, src }));
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [state.bytes]);

  return (
    <Box
      onPointerEnter={() => {
        setState((s) => ({ ...s, showGenerateButton: true }));
      }}
      onPointerLeave={() => {
        setState((s) => ({ ...s, showGenerateButton: false }));
      }}
      sx={{
        position: "relative",
        minHeight: "10em",
      }}
    >
      {state.showGenerateButton || isUndefined(state.src) ? (
        <Button
          sx={{ bottom: "0.5em", position: "absolute", right: "0.5em" }}
          onClick={async () => {
            console.log("generating image");
            if (isUndefined(state.promptRequest)) {
              return;
            }
            setState((s) => ({ ...s, loading: true }));
            const prompt = await ctx?.client?.ask(state.promptRequest);

            console.log(prompt);
            const imageGenRequest: Partial<SdApiTxt2ImgRequest> = { prompt };
            setState((s) => ({ ...s, imageGenRequest }));
            const blobs =
              await ctx?.client?.askForGeneratedImages(imageGenRequest);
            console.log(blobs);
            if (isUndefined(blobs)) {
              setState((s) => ({ ...s, loading: false }));
              return;
            }
            const bytes = await Bytes.toArrayBuffer(blobs[0]);
            console.log(bytes);
            onChange(bytes, imageGenRequest);
            setState((s) => ({ ...s, bytes: bytes, loading: false }));
          }}
        >
          Generate Image
        </Button>
      ) : undefined}
      {state.loading ? (
        <CircularProgress
          sx={{ top: "0.5em", position: "absolute", left: "0.5em" }}
        />
      ) : undefined}
      <Tooltip title={state.imageGenRequest?.prompt}>
        <img src={state.src} />
      </Tooltip>
    </Box>
  );
};
