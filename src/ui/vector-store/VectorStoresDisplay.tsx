import { Objects } from "@mjtdev/engine";
import { DataIndexesStates } from "../../backend/index/state/DataIndexesStates";
import { sortByName } from "../../common/sortByName";
import { AppBorder } from "../agent/AppBorder";
import { VectorStoreDisplay } from "./VectorStoreDisplay";

export const VectorStoresDisplay = () => {
  const idx = DataIndexesStates.useUserDataIndexState("vector-store");
  if (!idx) {
    return <>No voice index!</>;
  }
  return (
    <AppBorder
      style={{ maxHeight: "80vh", maxWidth: "80vw", overflow: "auto" }}
      title="vector stores"
    >
      {Objects.values(idx.records)
        .sort(sortByName)
        .map((vs, i) => (
          <VectorStoreDisplay key={i} vectorStoreId={vs.id} />
        ))}
    </AppBorder>
  );
};


