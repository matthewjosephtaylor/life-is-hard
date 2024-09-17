import { TypeBoxes } from "@mjtdev/engine";
import { getLihState } from "../state/LihState";

export const createAllTypesSystemMessage = () => {
  const { gamePack } = getLihState();
  const { schemas } = gamePack;

  return [
    "Existing Types:",
    "```typescript",
    ...schemas.map((schema) => {
      const typeInfo = TypeBoxes.schemaToTypeInfo(schema);
      return typeInfo.typeDeclaration;
    }),
    "```",
  ].join("\n");
};
