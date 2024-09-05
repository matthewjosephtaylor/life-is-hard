import { Card, Flex } from "@radix-ui/themes";
import type { AppCharacter, Chat } from "ai-worker-common";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { CharacterEditor } from "../../character/CharacterEditor";
import { updateAppCharacter } from "../../character/updateAppCharacter";
import { useAppModesAndParams } from "../../../state/location/useAppModesAndParams";

export const ChatCharacterEditor = ({
  chat,
  character,
}: {
  chat: Chat;
  character: AppCharacter | undefined;
}) => {
  const { modes } = useAppModesAndParams();
  if (!modes.includes("dev")) {
    return <></>;
  }

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Flex style={{ width: "100%" }} gap="2">
        <Flex
          style={{
            width: "100%",
          }}
        >
          {character ? (
            <CharacterEditor
              character={character}
              onSubmit={(character) => {
                return updateAppCharacter(character);
              }}
            />
          ) : undefined}
        </Flex>
      </Flex>
    </Card>
  );
};
