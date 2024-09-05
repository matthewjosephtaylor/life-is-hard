import { Keys, isUndefined, safe } from "@mjtdev/engine";
import { Aipls, type AiplAstSpec } from "ai-worker-common";
import { produce } from "immer";
import { useState } from "react";
import { AppEvents } from "../../../../event/AppEvents";
import { flattenAiplNode } from "../../../aipl/flattenAiplNode";
import { useAiplCurrentState } from "../../../aipl/useAiplCurrentState";
import { AppTextArea } from "../../../common/AppTextArea";
import { characterFieldToCharacterFieldValue } from "../characterFieldToCharacterFieldValue";
import { toStableAiplNodeId } from "../toStableAiplNodeId";
import { AIPL_AST_UPDATERS } from "./AIPL_AST_UPDATERS";
import { AIPL_CODE_GENERATORS } from "./AIPL_CODE_GENERATORS";

import { Flex, Text } from "@radix-ui/themes";
import { AppButtonGroup } from "../../../common/AppButtonGroup";

export const AiplCommentEditor = ({
  aiplNode,
}: {
  aiplNode: AiplAstSpec["comment"];
}) => {
  const { characterField, assistantCharacter, aiplLanguageParams } =
    useAiplCurrentState();

  const characterFieldValue =
    characterFieldToCharacterFieldValue({
      characterField,
      character: assistantCharacter,
    }) ?? "";
  const program = safe(() =>
    Aipls.tryParseAipl(characterFieldValue, aiplLanguageParams)
  );

  const [result, setResult] = useState(
    produce(
      { aiplNode, editEnabled: false, value: undefined as undefined | string },
      () => {}
    )
  );

  return (
    <Flex gap="1em">
      {result.editEnabled ? (
        <AppTextArea
          key={Keys.stableStringify(aiplNode)}
          onChange={(value) => {
            setResult((cur) =>
              produce(cur, (r) => {
                r.value = value;
              })
            );
          }}
          defaultValue={aiplNode.value}
        />
      ) : (
        <Text
          onClick={() => {
            console.log("clicked");
            setResult((cur) =>
              produce(cur, (r) => {
                r.editEnabled = true;
              })
            );
          }}
        >
          {aiplNode.value}
        </Text>
      )}
      {result.editEnabled ? (
        <AppButtonGroup
          disableds={{ save: isUndefined(result.value) }}
          colors={{ save: "green" }}
          actions={{
            cancel: () => {},
            save: () => {
              const generator = AIPL_CODE_GENERATORS["program"];
              if (isUndefined(generator) || isUndefined(program)) {
                return;
              }
              const updatedProgram = produce(program, (p) => {
                const nodes = flattenAiplNode(p);
                const targetNode = nodes.find(
                  (n) => toStableAiplNodeId(n) === toStableAiplNodeId(aiplNode)
                ) as AiplAstSpec["comment"];
                if (isUndefined(targetNode)) {
                  return;
                }
                const updater = AIPL_AST_UPDATERS["comment"];
                if (isUndefined(updater) || isUndefined(result.value)) {
                  return;
                }

                updater({ node: targetNode, value: result.value });
              });
              if (
                isUndefined(characterField) ||
                isUndefined(assistantCharacter)
              ) {
                return;
              }
              const generatedProgramText = generator(updatedProgram);
              AppEvents.dispatchEvent("aiplEditorUpdate", {
                characterId: assistantCharacter.id,
                fieldName: characterField,
                value: generatedProgramText ?? "",
              });
              setResult((cur) =>
                produce(cur, (r) => {
                  r.editEnabled = false;
                })
              );
            },
          }}
        />
      ) : undefined}
    </Flex>
  );
};
