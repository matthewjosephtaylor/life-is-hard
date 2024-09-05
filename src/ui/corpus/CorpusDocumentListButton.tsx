import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { openAppPopup } from "../popup/openAppPopup";
import { CorpusDocumentsDisplay } from "./CorpusDocumensDisplay";

export const CorpusDocumentListButton = (
  params: { parentId: string } & React.InputHTMLAttributes<HTMLInputElement>
) => {
  const { parentId, ...rest } = params;

  const docIds = DataObjectStates.useChildDataObjectIds(
    parentId,
    "corpus-document"
  );

  return (
    <input
      type="button"
      onClick={() => {
        openAppPopup(<CorpusDocumentsDisplay parentId={parentId} />);
      }}
      value={`📄 ${docIds.length}`}
      {...rest}
    />
  );
};
