import {
  type TypeInfo,
  TextGens,
  isDefined,
  isUndefined,
  safe,
} from "@mjtdev/engine";
import type { AiplClient } from "../../src/client/AiplClients";

export const askForMetadata = async ({
  client,
  object,
  metadataTypeInfo,
}: {
  client?: AiplClient;
  object?: unknown;
  metadataTypeInfo: TypeInfo;
}) => {
  if (!client) {
    throw new Error("No client provided");
  }
  if (!object) {
    throw new Error("No object provided to update");
  }
  const typeName = metadataTypeInfo.schema.$id;
  const ans = await client.ask({
    systemMessage: ["Metadata type is:", metadataTypeInfo.typeDeclaration].join(
      "\n"
    ),
    userMessage: [
      JSON.stringify(object),
      `For the above give a JSON ${typeName} response object ONLY! update the current ${typeName} following the instruction or just repeat the object if unsure, or output an error or nothing if the user wants something not possible, or there are no changes.`,
    ].join("\n"),
  });
  const jsonText = TextGens.extractMarkdownText(ans);
  const json = safe(() => JSON.parse(jsonText), { quiet: true });
  if (isUndefined(json)) {
    return;
  }
  if (isDefined(json["error"])) {
    console.log("metadata json error", json["error"]);
    return;
  }
  return json;
};
