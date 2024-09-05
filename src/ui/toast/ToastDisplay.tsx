import * as Toast from "@radix-ui/react-toast";
import { Flex } from "@radix-ui/themes";
import { AppEvents } from "../../event/AppEvents";
import { ToastItemDisplay } from "./ToastItemDisplay";
import { updateToastState, useToastState } from "./ToastState";
import { AppModes } from "../../state/location/AppModes";

export const ToastDisplay = () => {
  const { toasts } = useToastState();
  const { modes } = AppModes.useAppModesAndParams();

  AppEvents.useEventListener("toast", (evt) => {
    const { message, type } =
      typeof evt.detail === "string"
        ? { message: evt.detail, type: undefined }
        : evt.detail;

    if (type === "rag:query" && !modes.includes("doc")) {
      return;
    }
    updateToastState((s) => {
      s.toasts.unshift({ id: crypto.randomUUID(), text: message, type });
    });
  });
  const toastDisplays = toasts.map((t, i) => (
    <Toast.Root
      onClick={() => {
        updateToastState((s) => {
          s.toasts = s.toasts.filter((toast) => toast.id !== t.id);
        });
      }}
      onOpenChange={(open) => {
        if (!open) {
          updateToastState((s) => {
            s.toasts = s.toasts.filter((toast) => toast.id !== t.id);
          });
        }
      }}
      key={t.id}
    >
      {/* <Toast.Title>FOO</Toast.Title> */}
      <Toast.Description onClick={() => {}}>
        <ToastItemDisplay toast={t} />
      </Toast.Description>
      {/* <Toast.Close><Button>X</Button></Toast.Close> */}
    </Toast.Root>
  ));
  return (
    <Toast.Provider duration={10000} swipeDirection="right">
      <Flex gap="1">{toastDisplays}</Flex>
      <Toast.Viewport
        style={{
          position: "absolute",
          top: "3em",
          right: "1em",
        }}
      />
    </Toast.Provider>
  );
};
