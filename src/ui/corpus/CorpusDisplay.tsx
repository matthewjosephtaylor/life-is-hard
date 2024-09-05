import type { Corpus } from "ai-worker-common";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppBorder } from "../agent/AppBorder";
import { CorpusDocumentsDisplay } from "./CorpusDocumensDisplay";
import { ButtonGroup } from "@mjtdev/engine";
import { deleteCorpus } from "./deleteCorpus";

export const CorpusDisplay = ({ corpusId }: { corpusId: string }) => {
  const corpus = DataObjectStates.useDataObject<Corpus>(corpusId);
  if (!corpus) {
    return <>CorpusDisplay: No corpus for:{corpusId}</>;
  }

  return (
    <AppBorder title={corpus.name}>
      <ButtonGroup
        actions={{
          delete: () => {
            deleteCorpus(corpusId);
          },
        }}
      />
      <CorpusDocumentsDisplay parentId={corpusId} />
    </AppBorder>
  );
};
