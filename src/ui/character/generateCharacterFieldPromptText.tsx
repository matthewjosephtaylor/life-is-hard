import { isDefined } from "@mjtdev/engine";
import type { AppCharacter, ChatAnswer, TavernCardV2 } from "ai-worker-common";
import { Prompts } from "ai-worker-common";
import { signalToAbortHandler } from "../../ai/signalToAbortHandler";
import { Returns } from "../../state/data-object/Returns";
import { AppMessagesState } from "../../state/ws/AppMessagesState";

export const generateCharacterFieldPromptText = async ({
  character,
  omitDataKey,
  example,
  fieldName,
  onChange,
  direction,
  extraDirection = "",
  abortController,
}: {
  abortController: AbortController;
  onChange: (value: string, final: boolean) => void;
  fieldName: string;
  example?: string;
  omitDataKey: keyof TavernCardV2["data"];
  character: AppCharacter;
  direction: string;
  extraDirection?: string;
}) => {
  const char = character.card.data.name;
  const {
    extensions,
    [omitDataKey]: deletedKey,
    ...rest
  } = character.card.data;
  const charaText = Prompts.renderTemplateText(JSON.stringify(rest), {
    char,
  });

  const exampleDirection = example
    ? `# Example ${fieldName} field contains: "${example}"`
    : undefined;

  const renderedDirection = Prompts.renderTemplateText(direction, { char });
  const directions = [
    renderedDirection,
    exampleDirection,
    `# ${char}'s character information:`,
    `${charaText}`,
  ]
    .filter(isDefined)
    .join("\n");

  const abortId = signalToAbortHandler(abortController.signal);
  const ans = await new Promise<string | undefined>((resolve, reject) => {
    const returnId = Returns.addReturnListener<string>({
      onReturn: (answer) => {
        console.log("return answer", answer);
        resolve(answer);
      },
      onTimeout: () => {
        resolve(undefined);
      },
    });

    const streamId = Returns.addStreamListener<string>({
      stream: true,
      onData: (answer) => {
        console.log("stream dataObject", answer);
        onChange(answer, false);
      },
    });

    AppMessagesState.dispatch({
      type: "chat:ask",
      detail: {
        systemMessage: directions,
        userMessage: `Be Creative! Original content only! Generate a description of what the "${fieldName}" field of ${char}'s character card might contain.${extraDirection}`,

        assistantMessage: `${char}'s "${fieldName}" field contains: "`,
        maxResponseTokens: 1024,
        returnId,
        streamId,
        abortId,
      },
    });
  });

  if (!ans) {
    console.log("no ans");
    return;
  }
  const cleanedAns = ans.trim().replace(/"$/, "");

  onChange(cleanedAns, true);
};
