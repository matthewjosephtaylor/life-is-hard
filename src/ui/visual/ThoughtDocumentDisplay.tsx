import { Colors, createState } from "@mjtdev/engine";
import { useEffect, useRef } from "react";
import { openDataIdViewer } from "../../document-view/openDataIdViewer";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import type { ThoughtDocument } from "./ThoughtDocument";
import { idToColor } from "./idToColor";
import { Box, Button, Card, Flex, IconButton, Text } from "@radix-ui/themes";

export const [
  useThoughtDocumentsState,
  updateThoughtDocumentsState,
  getThoughtDocumentsState,
] = createState({
  documentToPosition: {} as Record<string, HTMLElement>,
});

export const thoughtDocumentToColor = (document: ThoughtDocument) => {
  return idToColor(document.dataId ?? document.id);
};

export const ThoughtDocumentDisplay = ({
  document,
}: {
  document: ThoughtDocument;
}) => {
  const corpusDocuments = DataObjectStates.useDataObjectsByType("corpus-document");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const dataId = document.dataId;
    if (!dataId) {
      return;
    }
    if (!element) {
      updateThoughtDocumentsState((s) => {
        delete s.documentToPosition[dataId];
      });
      return;
    }
    const parent = element.parentElement;
    const parentBbox = parent?.getBoundingClientRect();
    if (!parentBbox) {
      throw new Error("ThoughtDocumentDisplay: no parent");
    }
    updateThoughtDocumentsState((s) => {
      s.documentToPosition[dataId] = element;
    });
  }, [ref, document]);
  const name =
    corpusDocuments.find((d) => d.dataId === document.dataId)?.name ??
    document.id;
  const backgroundColor = thoughtDocumentToColor(document);
  const color = Colors.textColor([backgroundColor]);
  return (
    <Card
      style={{
        color,
        backgroundColor,
        height: "5em",
        // color: thoughtDocumentToColor(document),
        // backgroundColor: Colors.from("black").alpha(0.8).toString(),
        userSelect: "none",
      }}
      onClick={() => {
        openDataIdViewer(document, { title: document.name });
      }}
    >
      <Flex flexShrink={"1"} gap="2">
        <Text ref={ref} style={{ fontSize: "2em" }}>
          📄
        </Text>
        <Text size="1" style={{ maxWidth: "8em", textOverflow: "ellipsis" }}>
          {name}
        </Text>
      </Flex>
    </Card>
  );
};
