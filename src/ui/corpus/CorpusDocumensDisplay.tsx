import {
  Button,
  Flex,
  Grid,
  Separator,
  Strong,
} from "@radix-ui/themes";
import type { CorpusDocument } from "ai-worker-common";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AddCorpusDocumentFilesDisplay } from "./AddCorpusDocumentFilesDisplay";
import { deleteAllChildCorpusDocuments } from "./deleteAllChildCorpusDocuments";
import { toCorpusDocumentDisplayFields } from "./toCorpusDocumentDisplayFields";
import { CrawlWebDisplay } from "./CrawlWebDisplay";

export const CorpusDocumentsDisplay = ({ parentId }: { parentId: string }) => {
  const docs = DataObjectStates.useChildDataObjects(
    parentId,
    "corpus-document"
  );
  const fields: (keyof CorpusDocument)[] = ["name", "mediaType"];
  return (
    <Flex gap="5" align={"center"} direction={"column"}>
      <CrawlWebDisplay parentId={parentId} />
      <Separator size="4" />
      <Flex align={"center"} gap="9">
        <AddCorpusDocumentFilesDisplay parentId={parentId} />
        <Button
          color="red"
          onClick={() => deleteAllChildCorpusDocuments(parentId)}
        >
          Delete All Documents
        </Button>
      </Flex>
      <Separator size="4" />
      <Grid
        style={{ width: "100%" }}
        flexGrow={"1"}
        align={"start"}
        columns={`${fields.length}`}
      >
        {fields.map((h, i) => (
          <Strong style={{ textAlign: "center" }} key={i}>
            {h}
          </Strong>
        ))}
      </Grid>
      <Grid
        style={{ width: "100%", maxHeight: "10em", overflow: "auto" }}
        columns={`${fields.length}`}
      >
        {[...docs]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((document, i) =>
            toCorpusDocumentDisplayFields({
              fields,
              key: i,
              parentId,
              document,
              style: {
                margin: "0.25em",
                maxWidth: "12em",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              },
            })
          )}
      </Grid>
    </Flex>
  );
};
