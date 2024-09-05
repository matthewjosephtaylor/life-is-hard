import type { AiFunctionCall } from "ai-worker-common";
import type { AssistedEditorForm } from "./AssistedEditorForm";
import type { AssistedEditorCommandProps } from "./AssistedEditorDisplay";

export const aiFunctionCallsToAssistedEditorForm = (
  calls: Readonly<AiFunctionCall[]>
): AssistedEditorForm => {
  const fields: Record<string, string> = {};

  let title: string | undefined = undefined;
  for (const call of calls) {
    const { fieldName, value, name } = (call.args ??
      {}) as Partial<AssistedEditorCommandProps>;
    if (call.name === "create" && name) {
      title = name;
    }
    if (call.name === "update" && fieldName && value) {
      fields[fieldName] = value;
    }
  }

  return { title, fields };
};
