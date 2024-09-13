import { Button, type ButtonProps } from "@mui/material";
import { ButtonGroup } from "../../common/ButtonGroup";
import type { ADVENTURE_SCENE_TYPE_INFO } from "./ADVENTURE_SCENE_TYPE_INFO";
import { AiplClients } from "../../../src/client/AiplClients";
import type { ToolConfig } from "ai-worker-common";
import { isDefined } from "@mjtdev/engine";
import { updatePlayerLocation } from "./updatePlayerLocation";

export const ChooseOptionContent = ({
  options,
  toolConfig,
}: {
  toolConfig: ToolConfig;
  options?: (typeof ADVENTURE_SCENE_TYPE_INFO.type)["options"];
}) => {
  if (!options) {
    return <Button>OK</Button>;
  }
  const actions = Object.fromEntries(
    options.map((option) => {
      return [
        option.name,
        () => {
          console.log("Option chosen", option);
          const client = AiplClients.createAiplClient();
          client.addChatUserMessage({
            text: option.name,
            toolConfig,
          });
          if (isDefined(option.changedLocation)) {
            updatePlayerLocation({
              currentLocation: option.changedLocation,
              didExit: option.isExit,
            });
          }
        },
      ];
    })
  );
  const buttonProps = Object.fromEntries(
    options.map((option) => {
      return [
        option.name,
        {
          variant: "outlined",

          color: option.isExit ? "warning" : "success",
        } satisfies ButtonProps,
      ];
    })
  );
  return (
    <ButtonGroup gap={"0.5em"} buttonProps={buttonProps} actions={actions} />
  );
};
