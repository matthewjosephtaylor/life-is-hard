import { BrowserFiles } from "@mjtdev/engine";
import type { AppCharacter} from "ai-worker-common";
import { AppImages, Apps } from "ai-worker-common";
import { loadCharacterImage } from "./loadCharacterImage";
import { openErrorPopup } from "../../error/openErrorPopup";

export const downloadCharacterPng = async (character: AppCharacter) => {
  const image = await loadCharacterImage(character);
  if (!image) {
    return openErrorPopup(
      new Error(`No image for: ${character.id}. Edit and save character first?`)
    );
  }
  // const png = await AppImages.tavernCardToPng({ card: character.card, image });
  // BrowserFiles.writeFileBrowser(`${character.card.data.name}.png`, png);
  BrowserFiles.writeFileBrowser(`${character.card.data.name}.png`, image);
};
