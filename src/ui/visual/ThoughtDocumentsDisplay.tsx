import { Grid } from "@radix-ui/themes";
import type { Chat } from "ai-worker-common";
import type { CSSProperties } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import type { ThoughtDocument } from "./ThoughtDocument";
import { createThoughtDocument } from "./ThoughtDocument";
import { ThoughtDocumentDisplay } from "./ThoughtDocumentDisplay";

export const ThoughtDocumentsDisplay = ({
  chat,
  style,
}: {
  style?: CSSProperties;
  chat: Chat;
}) => {
  const thoughts = DataObjectStates.useDataObjectsByType("thought");
  // const chat = DataObjectStates.useDataObject<Chat>(chatId);
  const thoughtDocuments: ThoughtDocument[] = [];

  for (const thought of thoughts) {
    const { documents } = thought;
    for (const dataId of documents) {
      if (thoughtDocuments.find((td) => td.dataId === dataId)) {
        continue;
      }
      thoughtDocuments.push(
        createThoughtDocument({
          dataId,
        })
      );
    }
  }

  return (
    <Grid
      flexGrow={"1"}
      columns={{ initial: "1", sm: "2", md: "3", lg: "4", xl: "5" }}
      m="1"
      gap={"2"}
      style={{ height: "10em", overflow: "auto", ...style }}
      // style={{ backgroundColor: "red" }}
    >
      {Array.from(thoughtDocuments).map((document, i) => (
        <ThoughtDocumentDisplay key={i} document={document} />
      ))}
    </Grid>
  );
};
