import { TypeBoxes } from "@mjtdev/engine";
import { getLihState } from "./state/LihState";

export const createOtherTypesSystemMessage = () => {
  const { currentSchema, gamePack } = getLihState();
  const { schemas } = gamePack;

  const otherSchemas = schemas.filter(
    (schema) => schema.$id !== currentSchema?.$id
  );
  if (otherSchemas.length === 0) {
    return "";
  }
  return [
    "Existing Types:",
    ...otherSchemas.map((schema) => {
      const typeInfo = TypeBoxes.schemaToTypeInfo(schema);
      return typeInfo.typeDeclaration;
    }),
  ].join("\n");
};


