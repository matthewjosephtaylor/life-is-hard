import {
  Bytes,
  DropTarget,
  Dropzone,
  // Grid,
  isDefined,
  safe,
} from "@mjtdev/engine";
import { Box, Button, Container, Flex, TextArea } from "@radix-ui/themes";
import type { AppCharacter } from "ai-worker-common";
import { Apps } from "ai-worker-common";
import { AnimatePresence, motion } from "framer-motion";
import { produce } from "immer";
import { useRef, useState } from "react";
import { askForGeneratedImages } from "../../ai/askForGeneratedImages";
import { AppBorder } from "../agent/AppBorder";
import { DataImage } from "./DataImage";
import type { GeneratedImage } from "./GeneratedImage";
import { Waitable } from "./Waitable";
import { generateCharacterFieldPromptText } from "../character/generateCharacterFieldPromptText";
import { useIsUserGroup } from "../../state/user/useIsUserGroup";

export const ImageGenerationPopup = ({
  onGenerated = () => {},
  character,
  defaultImageId,
}: {
  character: AppCharacter;
  defaultImageId?: string;
  onGenerated?: (value: GeneratedImage) => void;
}) => {
  const [state, setState] = useState(
    produce(
      {
        image: undefined as Blob | undefined,
        imageId: defaultImageId,
        steps: 20,
        generatePromptAbortController: undefined as undefined | AbortController,
        generateImageAbortController: undefined as undefined | AbortController,
      },
      () => {}
    )
  );
  const promptTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const url = isDefined(state.image)
    ? URL.createObjectURL(state.image)
    : undefined;

  const generateImage = async (_state: typeof state) => {
    const abortController = new AbortController();

    setState(
      produce(_state, (s) => {
        s.generateImageAbortController = abortController;
      })
    );
    try {
      const images = await askForGeneratedImages(
        {
          prompt: promptTextAreaRef.current?.value,
          steps: _state.steps,
        },
        { signal: abortController.signal }
      );
      const image = images[0];

      setState(
        produce(_state, (s) => {
          s.image = image;
          s.generateImageAbortController = undefined;
        })
      );

      onGenerated({
        image,
        prompt: promptTextAreaRef.current?.value ?? "",
      });
    } catch (err) {
      Apps.error(err);
      setState(
        produce(_state, (s) => {
          s.generateImageAbortController = undefined;
        })
      );
    }
  };

  const generatePromptText = (abortController: AbortController) => {
    const direction = [
      "You are an expert text to image image generation prompt engineer program.",
      "You take in character information and output text describing the character as a camera would see it",
      `You only describe the physical aspects of {char} not mental states.`,
    ].join("\n");

    return generateCharacterFieldPromptText({
      character,
      direction,
      // extraDirection,
      fieldName: "image",
      omitDataKey: "extensions",
      abortController,
      onChange: (change, final) => {
        console.log("change", change);
        console.log("final", final);
        // setState(
        //   produce(state, (s) => {
        //     s.prompt = change;
        //   })
        // );
        if (promptTextAreaRef.current) {
          promptTextAreaRef.current.value = change;
        }

        // if (ref.current) {
        //   ref.current.setValue(change);
        // }
        // if (final) {
        //   onChange(change);
        // }
      },
      // example,
    });
  };

  return (
    <Flex direction={"column"} gap={"2"}>
      <Box title="controls" />
      <Container>
        <TextArea
          ref={promptTextAreaRef}
          autoFocus={true}
          title={"prompt"}
          style={{ height: "10em" }}
          disabled={
            isDefined(state.generateImageAbortController) ||
            isDefined(state.generatePromptAbortController)
          }
          // defaultValue={state.prompt}
          defaultValue={character.card.data.extensions?.genInfo?.imagePrompt}
          onKeyDown={(evt) => {
            if (evt.key === "Enter") {
              evt.preventDefault();
            }
          }}
          onKeyUp={async (evt) => {
            if (evt.key === "Enter") {
              evt.preventDefault();
              generateImage(state);
            }
          }}
        />
        <Flex gap={"3"} justify={"center"} style={{ marginTop: "1em" }}>
          <Button
            color={state.generateImageAbortController ? "amber" : "green"}
            onClick={async () => {
              if (state.generateImageAbortController) {
                state.generateImageAbortController.abort();
                setState(
                  produce(state, (s) => {
                    s.generateImageAbortController = undefined;
                  })
                );
                return;
              }
              await generateImage(state);
            }}
          >
            {state.generateImageAbortController ? "Cancel" : "Generate Image"}
          </Button>
          <Button
            color={state.generatePromptAbortController ? "amber" : "green"}
            onClick={async () => {
              if (state.generatePromptAbortController) {
                state.generatePromptAbortController.abort();
                setState(
                  produce(state, (s) => {
                    s.generatePromptAbortController = undefined;
                  })
                );
                return;
              }

              const abortController = new AbortController();
              setState(
                produce(state, (s) => {
                  s.generatePromptAbortController = abortController;
                })
              );
              await safe(() => generatePromptText(abortController));
              setState(
                produce(state, (s) => {
                  s.generatePromptAbortController = undefined;
                })
              );
            }}
          >
            {state.generatePromptAbortController ? "Cancel" : "Generate Prompt"}
          </Button>
          <Button
            onClick={() => {
              if (promptTextAreaRef.current) {
                promptTextAreaRef.current.value =
                  character.card.data.extensions?.genInfo?.imagePrompt ?? "";
              }
            }}
          >
            Restore Prompt
          </Button>
        </Flex>
      </Container>
      <Flex align={"center"} gap="5">
        <Flex gap="2" direction={"column"}>
          <AppBorder title={`steps ${state.steps}`}>
            <input
              type="range"
              min="1"
              max="50"
              step={"1"}
              defaultValue={state.steps}
              onChange={(evt) => {
                setState(
                  produce(state, (s) => {
                    s.steps = Number(evt.currentTarget.value);
                  })
                );
              }}
            />
          </AppBorder>
          <Dropzone
            iconSize="4em"
            iconCode="file_upload"
            inactiveText={`Add Existing Image`}
            action={async (files: File[]): Promise<void> => {
              if (!files || files.length < 1) {
                return;
              }
              const ab = await files[0].arrayBuffer();
              const image = Bytes.toBlob(ab, files[0].type);

              if (promptTextAreaRef.current) {
                promptTextAreaRef.current.value = "";
              }

              setState(
                produce(state, (s) => {
                  s.image = image;
                })
              );

              onGenerated({
                image: image,
                prompt: "",
              });
            }}
          />
        </Flex>

        <Waitable waiting={isDefined(state.generateImageAbortController)}>
          <AnimatePresence mode="wait" initial={false}>
            {url ? (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"url-image"}
                // title={state.prompt}
                src={url}
                style={{ maxWidth: "12em", maxHeight: "12em" }}
              />
            ) : (
              <motion.div
                key={"data-image"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <DataImage
                  style={{ maxWidth: "12em", maxHeight: "12em" }}
                  dataId={state.imageId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Waitable>
      </Flex>
    </Flex>
  );
};
