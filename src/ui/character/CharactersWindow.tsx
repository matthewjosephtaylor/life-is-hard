import { Button, Container, Flex, Section, Separator } from "@radix-ui/themes";
import { AddCharacterImage } from "./AddCharacterImage";
import { AppObjects } from "ai-worker-common";
import { CharacterGallery } from "./CharacterGallery";
import { openCharacterEditor } from "./openCharacterEditor";
import { useIsUserGroup } from "../../state/user/useIsUserGroup";
export const CharactersWindow = () => {
  return (
    <Section>
      <Container
        size={{
          initial: "1",
          sm: "2",
          md: "3",
          lg: "4",
        }}
      >
        <Flex align={"center"} gap="5" direction={"column"}>
          <Flex gap="9">
            <Button
              onClick={() => {
                openCharacterEditor(AppObjects.create("app-character"));
              }}
            >
              Create Character
            </Button>
            <Separator orientation="vertical" style={{ height: "4em" }} />
            <AddCharacterImage />
          </Flex>
          <Separator size="4" />

          <CharacterGallery />
        </Flex>
      </Container>
    </Section>
  );
};
