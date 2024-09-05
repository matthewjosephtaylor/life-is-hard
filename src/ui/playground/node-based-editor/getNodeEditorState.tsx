import { createState } from "@mjtdev/engine";


export const [nodeEditorState, updateNodeEditorState, getNodeEditorState] = createState({
  startX: undefined as number | undefined,
  lastText: "",
});
