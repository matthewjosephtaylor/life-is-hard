import { sortByName } from "../../common/sortByName";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { getUserState } from "../../state/user/UserState";
import { AppBorder } from "../agent/AppBorder";
import { CorpusDisplay } from "./CorpusDisplay";

export const CorpusList = () => {
  const corpusList = DataObjectStates.useChildDataObjects(
    getUserState().id,
    "corpus"
  );
  const contents = corpusList
    .sort(sortByName)
    .map((corpus, i) => <CorpusDisplay key={i} corpusId={corpus.id} />);
  return <AppBorder title="corpora">{contents}</AppBorder>;
};
