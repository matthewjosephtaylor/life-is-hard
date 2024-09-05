import { Flex } from "@radix-ui/themes";
import type { AppUser } from "ai-worker-common";
import {
  DataObjectStates,
  useDataObject,
} from "../../state/data-object/DataObjectStates";
import { useUserState } from "../../state/user/UserState";
import { CharacterAvatar } from "./CharacterAvatar";
import { sortCharactersByName } from "./sortCharactersByName";

export const CharacterGallery = ({
  onClick,
}: {
  onClick?: (characterId: string) => void;
}) => {
  const { id: userId } = useUserState();
  const user = useDataObject<AppUser>(userId);
  const characters = DataObjectStates.useChildDataObjects(
    userId,
    "app-character"
  );

  const characterList = [...characters].sort(sortCharactersByName);
  return (
    <Flex
      gap="2"
      wrap={"wrap"}
      style={{
        maxHeight: "calc(100vh - 20em)",
        maxWidth: "90vw",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {characterList
        .filter((chara) => {
          return chara.card.data.name !== user?.publicName;
        })
        .map((character, i) => (
          <Flex style={{ maxWidth: "12em" }} key={i}>
            <CharacterAvatar
              showActionButtons={true}
              buttonActions={["Chat With {char}", "Edit {char}", "chatHistory"]}
              imageStyle={{ width: "10em", maxHeight: "10em" }}
              key={i}
              character={character}
              onClick={onClick}
              showTags={true}
              showNotes={true}
            />
          </Flex>
        ))}
    </Flex>
  );
};
