import { closePopup, openCenteredPopup } from "@mjtdev/engine";
import { SearchVectorStorePopup } from "./SearchVectorStorePopup";

export const openSearchVectorStorePopup = (vectorStoreId: string) => {
  return new Promise((resolve, reject) => {
    const name = openCenteredPopup(
      <SearchVectorStorePopup
        vectorStoreId={vectorStoreId}
        onSubmit={() => {
          closePopup(name);
          resolve(undefined);
        }}
      />,
      {
        onClose: () => resolve(undefined),
      }
    );
  });
};
