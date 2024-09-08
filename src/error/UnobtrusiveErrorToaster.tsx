import { Flex } from "@radix-ui/themes";
import { produce } from "immer";
import { useState } from "react";
import { AppEvents } from "../event/AppEvents";
import { AppModes } from "../state/location/AppModes";
import { UnobtrusiveErrorToast } from "./UnobtrusiveErrorToast";

export const UnobtrusiveErrorToaster = () => {
  const [state, setState] = useState<Readonly<{ errors: unknown[] }>>(
    produce({ errors: [] }, () => {})
  );
  const { modes } = AppModes.useAppModesAndParams();
  AppEvents.useEventListener(
    "error",
    (evt) => {
      // if (modes.includes("pap")) {
      //   console.log(
      //     "UnobtrusiveErrorToaster: refusing to show error in PAP mode",
      //     evt.detail
      //   );
      //   return;
      // }
      setState(
        produce(state, (s) => {
          s.errors.push(evt.detail);
        })
      );
    },
    [state, setState, modes]
  );
  return (
    <Flex
      gap="2"
      direction={"column"}
      style={{ position: "absolute", right: "2ch", bottom: "2em" }}
    >
      {state.errors.map((error, i) => (
        <UnobtrusiveErrorToast
          // label={` message ${i}`}
          onEnd={() => {
            setState(
              produce(state, (s) => {
                s.errors = s.errors.filter((es) => es !== error);
              })
            );
          }}
          key={i}
          error={error}
        />
      ))}
    </Flex>
  );
};


