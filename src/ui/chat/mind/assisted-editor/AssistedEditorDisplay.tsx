import { createState, isDefined } from "@mjtdev/engine";
import { Button, Card, Flex, Grid, Strong } from "@radix-ui/themes";
import type { AiFunctionCall, Chat } from "ai-worker-common";
import { AppImages } from "ai-worker-common";
import { memo, useEffect, useState } from "react";
import { DataObjectStates } from "../../../../state/data-object/DataObjectStates";
import { useAppModesAndParams } from "../../../../state/location/useAppModesAndParams";
import { openCharacterEditor } from "../../../character/openCharacterEditor";
import { stringifyEq } from "../../stringifyEq";
import { AssistedEditorField } from "./AssistedEditorField";
import { aiFunctionCallsToAssistedEditorForm } from "./aiFunctionCallsToAssistedEditorForm";
import { b64ToImageId } from "./b64ToImageId";

export type AssistedEditorCommandProps = {
  type: string;
  name: string;
  fieldName: string;
  value: string;
};

export const [
  useAssistedEditorState,
  updateAssistedEditorState,
  getAssistedEditorState,
] = createState({
  commands: [] as AiFunctionCall[],
});

export const AssistedEditorDisplay = memo(({ chat }: { chat: Chat }) => {
  // export const AssistedEditorDisplay = ({ chat }: { chat: Chat }) => {
  // const messages = DataObjectStates.useChildDataObjects(
  //   chat.id,
  //   "chat-message"
  // );
  const calls = DataObjectStates.useChildDataObjects(chat.id, "function-call");

  // TODO no support multiple parents or support?
  // const functionCallResults = DataObjectStates.useChildDataObjects(
  //   messages.map((m) => m.id),
  //   "function-call-result"
  // );
  const [lastImage, setLastImage] = useState<string | undefined>();
  const [lastImagePrompt, setLastImagePrompt] = useState<string | undefined>();
  // console.log("AssistedEditorDisplay", { functionCallResults });
  const { modes } = useAppModesAndParams();

  useEffect(() => {
    updateAssistedEditorState((s) => {
      s.commands.length = 0;
    });
  }, []);
  // useEffect(() => {
  //   const last = messagesToLastImage(functionCallResults);
  //   setLastImage(last.lastImage);
  //   setLastImagePrompt(last.lastImagePrompt);
  // }, [functionCallResults]);

  if (!modes.includes("create")) {
    return <></>;
  }
  if (calls.length === 0) {
    return <></>;
  }
  const form = aiFunctionCallsToAssistedEditorForm(calls);

  const imageDisplay = lastImage ? (
    <img
      style={{ maxWidth: "20em", maxHeight: "20em" }}
      title="image"
      src={`data:image/*;base64,${lastImage}`}
    />
  ) : undefined;

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Flex
        style={{ maxHeight: "80vh", overflowY: "auto" }}
        align={"center"}
        direction={"column"}
        gap="2"
      >
        <Strong>{form.title}</Strong>
        {imageDisplay}
        <Grid
          gap="2"
          columns={{
            initial: "0",
            sm: "1",
            md: "2",
            lg: "3",
          }}
          style={{ maxHeight: "20em", overflow: "auto" }}
        >
          {Object.entries(form.fields)
            .map((field, i) => {
              const [fieldName, value] = field;
              return (
                <AssistedEditorField
                  key={i}
                  fieldName={fieldName}
                  value={value}
                />
              );
            })
            .filter(isDefined)}
        </Grid>
        <Flex align={"center"}>
          <Button
            onClick={async () => {
              console.log("creating character from", {
                form,
                lastImage,
                lastImagePrompt,
              });
              const imageDataId = lastImage
                ? await b64ToImageId(lastImage)
                : undefined;

              openCharacterEditor({
                imageDataId,
                card: AppImages.jsonToTavernCardV2({
                  spec: "chara_card_v2",
                  spec_version: "2.0",
                  data: {
                    name: form.title,
                    description: form.fields["description"],
                    personality: form.fields["personality"],
                    scenario: form.fields["scenario"],

                    extensions: {
                      physicalDescription: form.fields["physicalDescription"],
                      genInfo: {
                        imagePrompt: lastImagePrompt,
                      },
                    },
                  },
                }),
              });
            }}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
  // };
}, stringifyEq);
