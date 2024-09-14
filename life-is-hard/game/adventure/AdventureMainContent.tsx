import { Colors, Keys, type TypeInfo } from "@mjtdev/engine";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { AiplChatWindow } from "../../../src/aipl-components/AiplChatWindow";
import { AiplComponentProvider } from "../../../src/provider/AiplComponentProvider";
import { MarkdownTextDisplay } from "../../../src/ui/chat/message/MarkdownTextDisplay";
import type { GameEntity } from "../../state/GameEntity";
import { ADVENTURE_SCENE_TYPE_INFO } from "./ADVENTURE_SCENE_TYPE_INFO";
import { AdventureSceneImage } from "./AdventureSceneImage";
import { ChooseOptionContent } from "./ChoosOptionConent";
import { GoalAcceptContent } from "./GoalAcceptContent";
import { NpcsContent } from "./NpcsContent";
import { UpdateWorldContent } from "./UpdateWorldContent";
import { updatePlayerLocation } from "./updatePlayerLocation";

export const AdventureMainContent = () => {
  const [state, setState] = useState({
    typeInfo: undefined as undefined | TypeInfo,
    defaultComponentState: undefined as undefined | {},
    // image: undefined as undefined | GameImage,
    data: undefined as undefined | typeof ADVENTURE_SCENE_TYPE_INFO.type,
    currentLocation: undefined as undefined | GameEntity,
  });

  useEffect(() => {
    setState((s) => ({
      ...s,
      typeInfo: ADVENTURE_SCENE_TYPE_INFO,
      defaultComponentState: {},
    }));
  }, []);

  useEffect(() => {
    updatePlayerLocation({
      currentLocation: state.data?.currentLocation,
      // didExit: state.data?.didExit,
    });
  }, [Keys.stableStringify([state.data?.currentLocation])]);

  if (!state.typeInfo) {
    return <></>;
  }

  return (
    <AiplComponentProvider
      config={{ typeInfo: state.typeInfo }}
      defaultComponentState={state.defaultComponentState}
    >
      <Stack
        sx={{ width: "100%", overflow: "auto", position: "relative" }}
        direction={"row"}
        gap="1em"
      >
        <Stack
          sx={{
            maxHeight: "100vh",
            overflow: "auto",

            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8); ",
            // backgroundColor: Colors.from("black").alpha(0.2).toString(),
            color: "color(display-p3 0.933 0.933 0.933)",
            borderRadius: "0.5em",
          }}
          flexGrow={1}
        >
          <Stack sx={{ position: "relative", height: "fit-content" }}>
            <Stack
              sx={{
                backgroundColor: Colors.from("black").alpha(0.6).toString(),
              }}
            >
              <MarkdownTextDisplay text={state.data?.sceneText ?? "..."} />
            </Stack>
            <Stack
              sx={{
                position: "absolute",
                left: 0,
                top: "25%",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8); ",
                backgroundColor: Colors.from("black").alpha(0.6).toString(),
                color: "color(display-p3 0.933 0.933 0.933)",
                borderRadius: "0.5em",
                zIndex: -1,
              }}
            >
              <AdventureSceneImage
                npcNames={
                  // state.data?.npcs
                  []
                }
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              position: "absolute",
              bottom: "2em",
              maxWidth: "40ch",
              backgroundColor: Colors.from("black").alpha(0.6).toString(),
            }}
          >
            {/* <GoalAcceptContent newGoals={state.data?.newGoals} /> */}
            <NpcsContent npcNames={state.data?.npcs} />
            <ChooseOptionContent
              options={state.data?.options}
              toolConfig={{ schema: state.typeInfo.schema }}
            />
            {/* <JsonDisplay data={state.data?.updatedCharacterStats} /> */}
            <UpdateWorldContent
              commands={state.data?.commands}
            />
          </Stack>
        </Stack>
        <Stack sx={{ minWidth: "40ch" }}>
          <AiplChatWindow
            style={{
              minWidth: "40ch",
              maxWidth: "80ch",
              width: "100%",
              flexShrink: 1,
            }}
            onUpdate={async (componentState) => {
              console.log("COMPONENTSTATE", componentState);
              setState((s) => ({
                ...s,
                data: componentState as unknown as typeof ADVENTURE_SCENE_TYPE_INFO.type,
              }));
            }}
          />
        </Stack>
      </Stack>
    </AiplComponentProvider>
  );
};
