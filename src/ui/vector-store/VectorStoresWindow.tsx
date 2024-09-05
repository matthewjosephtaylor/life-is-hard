import { AppWindow } from "../AppWindow";
import { VectorStoresDisplay } from "./VectorStoresDisplay";
import { openCreateVectorStorePopup } from "./openCreateVectorStorePopup";

export const VectorStoresWindow = () => {
  return (
    <AppWindow title={"vector stores window"}>
      <input
        onClick={() => openCreateVectorStorePopup()}
        type="button"
        value="create vector store"
      />
      <VectorStoresDisplay />
    </AppWindow>
  );
};
