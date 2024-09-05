import { Bytes, Dropzone } from "@mjtdev/engine";
import {
  Card,
  Container,
  Flex,
  Separator,
  Strong
} from "@radix-ui/themes";
import { AppImages, AppObjects, uniqueId } from "ai-worker-common";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { DatasState } from "../../state/data/DatasState";
import { CharacterAvatar } from "../character/CharacterAvatar";
import { AppButtonGroup } from "../common/AppButtonGroup";


export const GroupDefaultCharacters = ({ groupId }: { groupId: string; }) => {
  const groupCharacters = DataObjectStates.useChildDataObjects(
    groupId,
    "app-character"
  );
  return (
    <Container>
      <Flex direction={"column"} gap="2" align="center">
        <Strong>Default Characters</Strong>
        Group: {groupId}
        <Separator size={"4"} />
        <Dropzone
          iconSize="3em"
          inactiveText="Add Character PNG"
          action={async (files) => {
            for (const file of files) {
              console.log("file", file);
              const ab = await file.arrayBuffer();
              const image = Bytes.toBlob(ab, file.type);
              const imageDataId = uniqueId("data");
              const { card } = await AppImages.pngToTavernCardAndVoiceSample(
                image
              );
              await DatasState.putBlob({ blob: image, id: imageDataId });
              const character = AppObjects.create("app-character", {
                card,
                imageDataId,
              });

              console.log("character", character);
              return DataObjectStates.upsertDataObject({
                objectType: "app-character",
                draft: character,
                parentId: groupId,
              });
            }
          }} />
        <Separator size={"4"} />
        {groupCharacters.map((chara, i) => (
          <Card key={i}>
            <Flex gap="2" align="center">
              <CharacterAvatar
                imageStyle={{ width: "4em", maxHeight: "4em" }}
                character={chara} />
              <AppButtonGroup
                colors={{ delete: "red" }}
                actions={{
                  delete: async () => {
                    await DatasState.deleteDataId(chara.imageDataId);
                    return DataObjectStates.deleteDataObject(chara.id);
                  },
                }} />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Container>
  );
};
