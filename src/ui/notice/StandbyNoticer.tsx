import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { AppEvents } from "../../event/AppEvents";

export const StandbyNoticer = () => {
  const [state, setState] = useState({ count: 0 });
  AppEvents.useEventListener(
    "client:standbyNotice",
    (evt) => {
      const counter = evt.detail.state === "start" ? +1 : -1;
      console.log("Event", evt.detail);
      console.log("Counter", counter);
      setState((s) => ({ count: s.count + counter }));
    },
    [setState]
  );
  return (
    <Flex
      gap="2"
      direction={"column"}
      style={{ position: "absolute", right: "2ch", bottom: "2em" }}
    >
      {state.count > 0 && <div>Waiting...</div>}
    </Flex>
  );
};
