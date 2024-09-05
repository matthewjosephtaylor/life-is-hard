import { isUndefined, waitTimeout } from "@mjtdev/engine";
import { Aipls, type AiplContext, type AppCharacter } from "ai-worker-common";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { getAiplCurrentState } from "../../aipl/useAiplCurrentState";
import { aiplNodeToReteNodes } from "./rete/aiplNodeToReteNodes";
import type { ReteEditor } from "./rete/createReteEditor";
import {
  getNodeEditorState,
  updateNodeEditorState,
} from "./getNodeEditorState";

export const updateReteEditor = async ({
  characterId,
  reteEditor,
  aiplContext,
}: {
  reteEditor?: ReteEditor;
  characterId?: string;
  aiplContext?: AiplContext;
}) => {
  if (isUndefined(reteEditor) || isUndefined(aiplContext)) {
    return;
  }
  const { aiplLanguageParams } = await getAiplCurrentState();
  const assistantCharacter = await DataObjectStates.getDataObject<AppCharacter>(
    characterId
  );
  const characterDescription = assistantCharacter?.card.data.description ?? "";
  if (getNodeEditorState().lastText === characterDescription) {
    return;
  }
  updateNodeEditorState((s) => {
    s.lastText = characterDescription;
  });
  await reteEditor.editor.clear();
  const program = Aipls.tryParseAipl(characterDescription, aiplLanguageParams);

  await aiplNodeToReteNodes({
    aiplNode: program,
    editor: reteEditor.editor,
    aiplContext,
  });
  await waitTimeout(1000);
  await reteEditor.layout(true);
  await reteEditor.zoom();
};
