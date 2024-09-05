import {
  Button,
  Card,
  DropdownMenu,
  Flex,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import type { AppCharacter } from "ai-worker-common";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { CharacterAvatar } from "../CharacterAvatar";
import { AccessPointThemeDisplay } from "./AccessPointThemeDisplay";
import { PublicAccessPointDisplay } from "./PublicAccessPointDisplay";
import { createAccessPoint } from "./createAccessPoint";
import { activateLinkInChildren } from "../../../state/data-object/activateLinkInChildren";

export const PublicAccessPointsDialog = ({
  characterId,
}: {
  characterId: string;
}) => {
  const character = DataObjectStates.useDataObject<AppCharacter>(characterId);
  const accessPointThemes = DataObjectStates.useChildDataObjects(
    characterId,
    "access-point-theme"
  );
  const activeAccessPointTheme = DataObjectStates.useChildDataObjects(
    characterId,
    "access-point-theme",
    "active"
  )[0];

  const accessPoints = DataObjectStates.useChildDataObjectIds(
    characterId,
    "access-point"
  );
  if (!character) {
    return <>No character for: {characterId}</>;
  }
  const title = `${character.card.data.name}'s Public Access Points`;
  const contents = accessPoints.map((accessPoint, i) => (
    <PublicAccessPointDisplay
      key={i}
      parentId={characterId}
      accessPointId={accessPoint}
    />
  ));

  const themeDisplays = accessPointThemes.map((theme, i) => (
    <AccessPointThemeDisplay
      key={i}
      themeId={theme.id}
      parentId={characterId}
    />
  ));

  console.log("PublicAccessPointsDialog active theme", {
    activeAccessPointTheme,
  });

  return (
    <Flex style={{ height: "100%" }} gap="2" direction={"column"}>
      <Flex align={"baseline"} gap="1">
        <CharacterAvatar
          hoverActions={[]}
          showName={false}
          character={character}
          imageStyle={{ maxHeight: "4em", maxWidth: "4em" }}
        />
        <Strong>{title}</Strong>
      </Flex>
      <Separator size={"4"} />
      <Flex align={"center"} gap="2">
        <Card>
          <Flex align={"center"} gap="2">
            <Text>Active Theme</Text>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button>
                  {activeAccessPointTheme
                    ? activeAccessPointTheme.name ?? activeAccessPointTheme.id
                    : "No Active Theme"}
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <Flex gap="1" direction={"column"}>
                  {accessPointThemes.map((apt, i) => (
                    <DropdownMenu.Item
                      key={i}
                      onSelect={() => {
                        activateLinkInChildren({
                          activeId: apt.id,
                          children: accessPointThemes.map((t) => t.id),
                          objectType: "access-point-theme",
                          parentId: characterId,
                        });
                      }}
                    >
                      <Flex style={{ userSelect: "none" }} key={i}>
                        {apt.name ?? apt.id}
                      </Flex>
                    </DropdownMenu.Item>
                  ))}
                </Flex>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Card>
        <Button
          onClick={() => {
            DataObjectStates.upsertDataObject({
              objectType: "access-point-theme",
              draft: {},
              parentId: characterId,
            });
          }}
        >
          Add Theme
        </Button>
      </Flex>
      <Separator size={"4"} />
      <Flex
        style={{ maxHeight: "20em", overflow: "auto" }}
        gap="3"
        direction={"column"}
      >
        {themeDisplays}
      </Flex>
      <Separator size={"4"} />
      <Flex>
        <Button onClick={() => createAccessPoint({ parentId: characterId })}>
          Create Access Point
        </Button>
      </Flex>
      <Flex
        flexGrow={"1"}
        style={{ height: "10em", overflow: "auto" }}
        gap="3"
        direction={"column"}
      >
        {contents}
      </Flex>
    </Flex>
  );
};
