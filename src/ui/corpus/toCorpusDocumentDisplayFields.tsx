import type { CorpusDocument } from "ai-worker-common";
import type { CSSProperties } from "react";
import { AppContextMenu } from "../common/AppContextMenu";
import { deleteCorpusDocument } from "./deleteCorpusDocument";
import { downloadCorpusDocument } from "./downloadCorpusDocument";
import { openCoprusDocumentViewer } from "./openCoprusDocumentViewer";

import { Flex, Text } from "@radix-ui/themes";

export const toCorpusDocumentDisplayFields = ({
  key,
  parentId,
  style = {},
  fields,
  document,
}: {
  key: string | number;
  parentId: string;
  document: CorpusDocument;
  style?: CSSProperties;
  fields: (keyof CorpusDocument)[];
}) => {
  return fields.map((f, i) => (
    <AppContextMenu
      actions={{
        delete: () => deleteCorpusDocument(document.id),
        download: () => downloadCorpusDocument(document.id),
        open: () => {
          openCoprusDocumentViewer({ documentId: document.id });
        },
      }}
      // onContextMenu={(evt) =>
      //   openAppContextMenu(evt, {
      //   })
      // }
      style={{ userSelect: "none", ...style }}
      key={`${key}-${i}`}
    >
      <Flex wrap={"wrap"} style={{ maxHeight: "4em", overflow: "auto" }}>
        <Text
          style={{ whiteSpace: "normal" }}
          onClick={() => {
            openCoprusDocumentViewer({ documentId: document.id });
          }}
        >
          {document[f]}
        </Text>
      </Flex>
    </AppContextMenu>
  ));
};
