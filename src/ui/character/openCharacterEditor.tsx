import type { AppCharacter, DecomposedAppCharacter } from "ai-worker-common";
import { openAppPopup } from "../popup/openAppPopup";
import { CharacterEditor } from "./CharacterEditor";
import { closeAppPopup } from "../popup/closeAppPopup";
import { updateAppCharacter } from "./updateAppCharacter";

export const openCharacterEditor = async (
  character: Partial<AppCharacter>,
  options: Partial<{ defaultTab: string }> = {}
) => {
  const updated = await new Promise<DecomposedAppCharacter | undefined>(
    (resolve, reject) => {
      openAppPopup(
        <CharacterEditor
          defaultTab={options.defaultTab}
          character={character}
          onSubmit={(value) => {
            closeAppPopup();
            resolve(value);
          }}
        />,
        // { size: "4" }
        {
          style: {
            width: "fit-content",
            maxHeight: "80vh",
            maxWidth: "80vw",
            overflow: "auto",
          },
        }
      );
    }
  );
  return updateAppCharacter(updated);
};
