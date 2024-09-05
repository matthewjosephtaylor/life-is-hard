import { CharacterGallery } from "../character/CharacterGallery";
import { AppBorder } from "../agent/AppBorder";


export const ChooseCharacterDisplay = () => {
  return (
    <AppBorder title="choose who to converse with">
      <CharacterGallery
        onClick={(characterId) => {
          // startChatWithCharacters({ aiCharacterId: characterId });
        }} />
    </AppBorder>
  );
};
