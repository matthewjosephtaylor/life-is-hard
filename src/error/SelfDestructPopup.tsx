import type {
  AnimateState} from "@mjtdev/engine";
import {
  Animates,
  Center,
  Colors,
  Grid,
  closePopup,
  createState,
  safe,
} from "@mjtdev/engine";
import { useEffect, useState } from "react";
import { errorToString } from "./errorToString";
import { AppBorder } from "../ui/agent/AppBorder";
import { AppEvents } from "../event/AppEvents";

export const [
  useSelfDestructState,
  updateSelfDestructState,
  getSelfDestructState,
] = createState({
  timer: 10,
  getAnimator: undefined as (() => AnimateState) | undefined,
});
export const SelfDestructPopup = ({
  message: message,
  name,
}: {
  message: unknown;
  name: string;
}) => {
  const [messageDisplay, setMessageDisplay] = useState("");

  const { timer } = useSelfDestructState();

  AppEvents.useEventListener("aiFunctionCalled", (evt) => {
    if (/(close|cancel).*/i.test(evt.detail.name)) {
      // const { getAnimator } = getSelfDestructState();
      // if (getAnimator) {
      //   getAnimator().abortController.abort();
      // }
      closePopup(name);
    }
  });
  useEffect(() => {
    if (!message) {
      return;
    }
    errorToString(message).then((value) => setMessageDisplay(value));
  }, [message]);
  return (
    <AppBorder style={{}} title="message">
      <Grid
        gap={"1em"}
        cellSize={"min-content"}
        style={{
          padding: "1em",
        }}
        direction="row"
      >
        <h1>!!!SELF DESTRUCT INITIATED!!!</h1>
        <Center style={{ color: "red", fontSize: "10em" }}>
          {timer > 0 ? timer : "BOOM!"}
        </Center>
        <Center>
          <button
            style={{ width: "min-content" }}
            onClick={() => closePopup(name)}
          >
            Close
          </button>
        </Center>
      </Grid>
    </AppBorder>
  );
};
