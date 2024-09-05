import { Flex } from "@radix-ui/themes";
import { CharacterAvatar } from "../CharacterAvatar";
import type { AppCharacter } from "ai-worker-common";

export const PaPCharacterAvatar = ({
  character,
}: {
  character: AppCharacter;
}) => {
  return (
    <Flex gap="2" align={"center"}>
      <CharacterAvatar
        hoverActions={[]}
        imageStyle={{ maxWidth: "2em", maxHeight: "2em" }}
        character={character}
        showName={false}
        showHoverButtons={false}
        enableDocumentDrop={false}
      />
      {character.card.data.name}
    </Flex>
  );
};
