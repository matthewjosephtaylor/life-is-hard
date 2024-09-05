import { Objects } from "@mjtdev/engine";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import { sortByName } from "../../common/sortByName";


export const useVectorStoreOptions = () => {
  const idx = DataIndexesStates.useUserDataIndexState("vector-store");
  if (!idx) {
    return [];
  }

  const empty = <option key="empty" value={undefined} />;
  return [
    empty,
    ...Objects.values(idx.records)
      .sort(sortByName)
      .map((v, i) => (
        <option key={i} value={v.id}>
          {v.name}
        </option>
      )),
  ];
};
