import { Bytes, isUndefined } from "@mjtdev/engine";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import type { SdApiTxt2ImgRequest } from "ai-worker-common";
import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { createImageGenPromptFromObject } from "./createImageGenPromptFromObject";
import type { GameImage } from "./state/GameImage";
import { AiplClients } from "../src/client/AiplClients";
import ReplayIcon from "@mui/icons-material/Replay";

export const ObjectImage = ({
  src,
  bytes,
  request,
  schemaName,
  object,
  onValueChange = () => {},
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> &
  Partial<{
    bytes: ArrayBuffer;
    src: string;
    schemaName?: string;
    object?: unknown;
    request: Partial<SdApiTxt2ImgRequest>;
    onValueChange: (
      bytes: ArrayBuffer,
      request: Partial<SdApiTxt2ImgRequest>
    ) => void;
  }>) => {
  const [state, setState] = useState({
    bytes: undefined as undefined | ArrayBuffer,
    showGenerateButton: false,
    loading: false,
    src: undefined as undefined | string,
    imageGenRequest: undefined as undefined | GameImage["request"],
    promptRequest: undefined as
      | undefined
      | ReturnType<typeof createImageGenPromptFromObject>,
  });
  // const ctx = useAiplComponentContext();
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
    const prompt = createImageGenPromptFromObject({ schemaName, object });
    setState((s) => ({ ...s, promptRequest: prompt }));
  }, [schemaName, object]);

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
        // minHeight: "10em",
      }}
    >
      {state.showGenerateButton || isUndefined(state.src) ? (
        <IconButton
          aria-label="generate image"
          sx={{ bottom: "0.5em", position: "absolute", right: "0.5em" }}
          onClick={async () => {
            console.log("generating image");
            if (isUndefined(state.promptRequest)) {
              return;
            }
            setState((s) => ({ ...s, loading: true }));
            const client = AiplClients.createAiplClient();
            const prompt = await client.ask(state.promptRequest);

            console.log(prompt);
            const imageGenRequest: Partial<SdApiTxt2ImgRequest> = { prompt };
            setState((s) => ({ ...s, imageGenRequest }));
            const blobs = await client.askForGeneratedImages(imageGenRequest);
            console.log(blobs);
            if (isUndefined(blobs)) {
              setState((s) => ({ ...s, loading: false }));
              return;
            }
            const bytes = await Bytes.toArrayBuffer(blobs[0]);
            console.log(bytes);
            onValueChange(bytes, imageGenRequest);
            setState((s) => ({ ...s, bytes: bytes, loading: false }));
          }}
        >
          <ReplayIcon />
        </IconButton>
      ) : undefined}
      {state.loading ? (
        <CircularProgress
          sx={{ top: "0.5em", position: "absolute", left: "0.5em" }}
        />
      ) : undefined}
      <Tooltip title={state.imageGenRequest?.prompt}>
        <img src={state.src} {...rest} />
      </Tooltip>
    </Box>
  );
};
