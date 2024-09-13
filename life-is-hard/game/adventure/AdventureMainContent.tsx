import { Bytes, isDefined, safe, type TypeInfo } from "@mjtdev/engine";
import { Divider, Stack } from "@mui/material";
import type { SdApiTxt2ImgRequest } from "ai-worker-common";
import { useEffect, useState } from "react";
import { AiplChatWindow } from "../../../src/aipl-components/AiplChatWindow";
import { AiplClients } from "../../../src/client/AiplClients";
import { AiplComponentProvider } from "../../../src/provider/AiplComponentProvider";
import { MarkdownTextDisplay } from "../../../src/ui/chat/message/MarkdownTextDisplay";
import { nameOfValue } from "../../common/nameOfValue";
import { createOtherEntitiesSystemMessage } from "../../createOtherEntitiesSystemMessage";
import { createActiveGoalsEntitiesSystemMessage } from "../../entity/createActiveGoalsEntitiesSystemMessage";
import { createAllEntitiesSystemMessage } from "../../entity/createAllEntitiesSystemMessage";
import { createAllTypesSystemMessage } from "../../entity/createAllTypesSystemMessage";
import { ObjectImage } from "../../ObjectImage";
import type { GameImage } from "../../state/GameImage";
import { useCurrentLocation } from "../../useCurrentLocation";
import { usePc } from "../../usePc";
import { ADVENTURE_SCENE_TYPE_INFO } from "./ADVENTURE_SCENE_TYPE_INFO";
import { ChooseOptionContent } from "./ChoosOptionConent";
import { GoalAcceptContent } from "./GoalAcceptContent";
import { UpdatePcStatsContent } from "./UpdatePcStatsContent";
import { updatePlayerLocation } from "./updatePlayerLocation";
import type { GameEntity } from "../../state/GameEntity";

export const AdventureMainContent = () => {
  const pc = usePc();
  const currentLocation = useCurrentLocation();

  const [state, setState] = useState({
    typeInfo: undefined as undefined | TypeInfo,
    defaultComponentState: undefined as undefined | {},
    image: undefined as undefined | GameImage,
    data: undefined as undefined | typeof ADVENTURE_SCENE_TYPE_INFO.type,
    currentLocation: undefined as undefined | GameEntity,
    client: undefined as
      | undefined
      | ReturnType<typeof AiplClients.createAiplClient>,
  });
  useEffect(() => {
    if (isDefined(state.client)) {
      return;
    }
    const startChatSystemMessage = [
      createAllTypesSystemMessage(),
      createAllEntitiesSystemMessage(),
      createActiveGoalsEntitiesSystemMessage(),
      `The user/player character is ${nameOfValue(pc?.object)}`,
      `The user/player is at ${nameOfValue(currentLocation?.object)}`,
      "You are the game master for this adventure.",
      "be creative and have the user/player character interact with the world.",
      "Use natural language only when communicating with the user/player character unless specifically asked for JSON.",
    ].join("\n");
    const client = AiplClients.createAiplClient();
    setState((s) => ({
      ...s,
      typeInfo: ADVENTURE_SCENE_TYPE_INFO,
      defaultComponentState: {},
      client,
    }));
    client
      .startChat({
        schema: ADVENTURE_SCENE_TYPE_INFO.schema,
        systemMessage: startChatSystemMessage,
      })
      .then(() => {
        client.addChatUserMessage({
          text: "Where am I and what can I do?",
          toolConfig: { schema: ADVENTURE_SCENE_TYPE_INFO.schema },
        });
      });
  }, [pc, currentLocation]);

  useEffect(() => {
    updatePlayerLocation({
      currentLocation: state.data?.currentLocation,
      didExit: state.data?.didExit,
    });
  }, [state.data]);

  const updateImage = async ({
    location,
    pc,
    componentState,
  }: {
    componentState?: typeof ADVENTURE_SCENE_TYPE_INFO.type;
    location?: GameEntity;
    pc?: GameEntity;
  }) => {
    const client = AiplClients.createAiplClient();

    const promptRequest = `Create an image generation prompt from the following: ${ADVENTURE_SCENE_TYPE_INFO.schema.$id} with the following properties: ${safe(() => JSON.stringify(componentState), { quiet: true })} `;
    const prompt = await client.ask({
      userMessage: promptRequest,

      systemMessage: [
        createOtherEntitiesSystemMessage(),
        `The user/player character is ${nameOfValue(pc?.object)}`,
        `The user/player is at ${nameOfValue(location?.object)}`,
        "Focus on what the entire scene looks like, focus on the environment.",
        "use all image generation prompt engineering techniques to generate the best image possible. Only return the prompt itself!",
      ].join(),
    });
    console.log(prompt);

    const imageGenRequest: Partial<SdApiTxt2ImgRequest> = { prompt };
    const blobs = await client.askForGeneratedImages(imageGenRequest);
    console.log(blobs);
    if (!blobs || blobs.length === 0) {
      return;
    }
    const bytes = await Bytes.toArrayBuffer(blobs[0]);
    const image: GameImage = {
      bytes,
      request: imageGenRequest,
    };
    setState((s) => ({ ...s, image }));
  };

  useEffect(() => {
    if (state.currentLocation === currentLocation) {
      return;
    }
    setState((s) => ({ ...s, currentLocation }));
    updateImage({ location: currentLocation, pc, componentState: state.data });
  }, [state.currentLocation, currentLocation, state.data, pc]);

  if (!state.typeInfo) {
    return <></>;
  }

  return (
    <AiplComponentProvider
      config={{ typeInfo: state.typeInfo }}
      defaultComponentState={state.defaultComponentState}
    >
      <Stack
        sx={{ width: "100%", overflow: "auto" }}
        direction={"row"}
        gap="1em"
      >
        <Stack sx={{ maxHeight: "100vh", overflow: "auto" }} flexGrow={1}>
          {/* <StartNewAiplChatButton
            schema={state.typeInfo.schema}
            systemMessage={startChatSystemMessage}
          /> */}
          <Stack>
            <ObjectImage
              onValueChange={(bytes, request) => {
                console.log("onChange", bytes, request);
                setState((s) => ({ ...s, image: { bytes, request } }));
              }}
              object={state.data}
              schemaName={state.typeInfo.schema.$id}
              {...state.image}
            />
          </Stack>
          <GoalAcceptContent newGoals={state.data?.newGoals} />
          <MarkdownTextDisplay text={state.data?.sceneText ?? "..."} />
          <ChooseOptionContent
            options={state.data?.options}
            toolConfig={{ schema: state.typeInfo.schema }}
          />
          <Divider />
          {/* <JsonDisplay data={state.data?.updatedCharacterStats} /> */}
          <UpdatePcStatsContent
            updatedStats={state.data?.updatedCharacterStats}
          />
          <Divider />
          <Divider />
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
