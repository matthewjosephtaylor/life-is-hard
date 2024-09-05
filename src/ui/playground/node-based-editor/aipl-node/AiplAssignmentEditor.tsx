import { Keys, isUndefined, safe } from "@mjtdev/engine";
import { Aipls, type AiplAstSpec } from "ai-worker-common";
import { produce } from "immer";
import { useState } from "react";
import { useAiplCurrentState } from "../../../aipl/useAiplCurrentState";
import { AppTextArea } from "../../../common/AppTextArea";
import { characterFieldToCharacterFieldValue } from "../characterFieldToCharacterFieldValue";
import { aiplNodeToCode } from "./AIPL_CODE_GENERATORS";

import { Flex, Text } from "@radix-ui/themes";
import { AppButtonGroup } from "../../../common/AppButtonGroup";
import { AiplNodeToEditorNodeContent } from "./AiplNodeToEditorNodeContent";
import { aiplNodeToString } from "./aiplNodeToString.1";

export const AiplAssignmentEditor = ({
  aiplNode,
}: {
  aiplNode: AiplAstSpec["assignment"];
}) => {
  const {
    aiplContext,
    characterField,
    assistantCharacter,
    aiplLanguageParams,
  } = useAiplCurrentState();

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
  console.log("aiplNode", aiplNode);

  return (
    <Flex gap="1em">
      {result.editEnabled ? (
        <Flex>
          <AppTextArea
            key={Keys.stableStringify(aiplNode.question)}
            onChange={(value) => {
              setResult((cur) =>
                produce(cur, (r) => {
                  r.value = value;
                })
              );
            }}
            defaultValue={aiplNodeToCode(aiplNode.question)}
          />
          <AppTextArea
            key={Keys.stableStringify(aiplNode.transformExpr)}
            onChange={(value) => {
              setResult((cur) =>
                produce(cur, (r) => {
                  r.value = value;
                })
              );
            }}
            defaultValue={aiplNodeToCode(aiplNode.transformExpr)}
          />
        </Flex>
      ) : (
        <Flex
          onClick={() => {
            setResult((cur) =>
              produce(cur, (r) => {
                r.editEnabled = true;
              })
            );
          }}
        >
          <Text>
            {aiplNodeToString({
              aiplContext,
              aiplNode: aiplNode.question,
            })}
          </Text>
          <AiplNodeToEditorNodeContent aiplNode={aiplNode.transformExpr} />
          {/* <Text>
            {aiplNodeToString({
              aiplContext,
              aiplNode: aiplNode.transformExpr,
            })}
          </Text> */}
        </Flex>
      )}
      {result.editEnabled ? (
        <AppButtonGroup
          disableds={{ save: isUndefined(result.value) }}
          colors={{ save: "green" }}
          actions={{
            cancel: () => {
              setResult((cur) =>
                produce(cur, (r) => {
                  r.editEnabled = false;
                })
              );
            },
            save: () => {
              return;
              // const generator = AIPL_CODE_GENERATORS["program"];
              // if (isUndefined(generator) || isUndefined(program)) {
              //   return;
              // }
              // const updatedProgram = produce(program, (p) => {
              //   const nodes = flattenAiplNode(p);
              //   const targetNode = nodes.find(
              //     (n) => toStableAiplNodeId(n) === toStableAiplNodeId(aiplNode)
              //   ) as AiplAstSpec["comment"];
              //   if (isUndefined(targetNode)) {
              //     return;
              //   }
              //   const updater = AIPL_AST_UPDATERS["comment"];
              //   if (isUndefined(updater) || isUndefined(result.value)) {
              //     return;
              //   }

              //   updater({ node: targetNode, value: result.value });
              // });
              // if (
              //   isUndefined(characterField) ||
              //   isUndefined(assistantCharacter)
              // ) {
              //   return;
              // }
              // const generatedProgramText = generator(updatedProgram);
              // AppEvents.dispatchEvent("aiplEditorUpdate", {
              //   characterId: assistantCharacter.id,
              //   fieldName: characterField,
              //   value: generatedProgramText ?? "",
              // });
              // setResult((cur) =>
              //   produce(cur, (r) => {
              //     r.editEnabled = false;
              //   })
              // );
            },
          }}
        />
      ) : undefined}
    </Flex>
  );
};
