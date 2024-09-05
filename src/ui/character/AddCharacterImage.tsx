import { Bytes, Dropzone, safeAsync } from "@mjtdev/engine";
import { AppImages } from "ai-worker-common";
import { createTavernCard } from "../../character/createTavernCard";
import { imageAndCardToCharacter } from "./imageAndCardToCharacter";

export const AddCharacterImage = () => {
  return (
    <Dropzone
      iconSize="3em"
      inactiveText="Import Character (png)"
      action={(files: File[]): void => {
        files.map(async (file) => {
          const ab = await file.arrayBuffer();
          const cards = await safeAsync(() => AppImages.pngToTavernCards(ab), {
            quiet: true,
          });
          const image = Bytes.toBlob(ab, file.type);
          if (!cards || cards.length === 0) {
            const card = createTavernCard({
              data: {
                name: file.name,
              },
            });
            await imageAndCardToCharacter({ image, card });
            return;
          }
          for (const card of cards) {
            await imageAndCardToCharacter({ image, card });
          }
        });
      }}
    />
  );
};
