import { isDefined, safe } from "@mjtdev/engine";
import { Button, Flex, Tabs } from "@radix-ui/themes";
import type { AppCharacter, TavernCardV2 } from "ai-worker-common";
import { produce } from "immer";
import { memo, useRef, useState } from "react";
import { AiplEditor } from "../aipl/AiplEditor";
import type { AiplEditorRef } from "../aipl/AiplEditorRef";
import { stringifyEq } from "../chat/stringifyEq";
import { generateCharacterFieldPromptText } from "./generateCharacterFieldPromptText";

export const CharacterTextAreaTabContent = memo(
  ({
    tabKey,
    onChange,
    defaultValue,
    character,
    omitDataKey,
    extraDirection = "",
    example,
  }: {
    example?: string;
    extraDirection?: string;
    tabKey: string;
    omitDataKey: keyof TavernCardV2["data"];
    character: AppCharacter;
    defaultValue: string | undefined;
    onChange: (value: string) => void;
  }) => {
    const ref = useRef<AiplEditorRef>(null);
    const [state, setState] = useState(
      produce(
        {
          abortController: undefined as undefined | AbortController,
        },
        () => {}
      )
    );
    const generatePromptText = (abortController: AbortController) => {
      const direction = [
        "You are an expert character description prompt engineer program.",
        "You take in character information and output text describing the character",
        `Use the existing entry for influence only. Don't parrot it back.`,
        "Use {{char}} to refer to the character and {{user}} to refer to the user",
        "DO NOT EXPlAIN OR MAKE COMMENTS! JUST PROVIDE THE FIELD CONTENTS ONLY!",
        "DO NOT REPEAT OR PLAGIARIZE from the character information below when generating field contents",
        "Only use the character information for reference! DO NOT COPY!",
      ]
        .filter(isDefined)
        .join("\n");

      return generateCharacterFieldPromptText({
        character,
        direction,
        extraDirection,
        fieldName: tabKey,
        omitDataKey,
        abortController,
        onChange: (change, final) => {
          if (ref.current) {
            ref.current.setValue(change);
          }
          if (final) {
            onChange(change);
          }
        },
        example,
      });
    };

    return (
      <Tabs.Content style={{ width: "100%" }} key={tabKey} value={tabKey}>
        <Flex
          style={{
            width: "100%",
            minWidth: "40ch",
            maxWidth: "80ch",
            height: "100%",
            maxHeight: "50vh",
          }}
          gap="2"
          direction={"column"}
        >
          <AiplEditor
            fieldName={omitDataKey}
            characterId={character.id}
            ref={ref}
            defaultValue={defaultValue}
            onChange={(value) => onChange(value)}
          />

          <Flex gap="2">
            <Button
              color={state.abortController ? "amber" : "green"}
              onClick={async () => {
                if (state.abortController) {
                  state.abortController.abort();
                  setState(
                    produce(state, (s) => {
                      s.abortController = undefined;
                    })
                  );

                  return;
                }

                const abortController = new AbortController();
                setState(
                  produce(state, (s) => {
                    s.abortController = abortController;
                  })
                );
                await safe(() => generatePromptText(abortController));
                setState(
                  produce(state, (s) => {
                    s.abortController = undefined;
                  })
                );
              }}
            >
              {state.abortController ? "Cancel" : "Generate"}
            </Button>
          </Flex>
        </Flex>
      </Tabs.Content>
    );
  },
  stringifyEq
);
