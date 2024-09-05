import { Button } from "@radix-ui/themes";
import { startCustomAsr } from "./startCustomAsr";
import { stopVadAsr } from "./stopVadAsr";
import { useCustomAsrState } from "./updateCustomAsrState";

export const AudioCaptureButton = () => {
  const { enabled, speaking } = useCustomAsrState();

  return (
    <Button
      color={enabled ? (speaking ? "yellow" : "green") : undefined}
      onClick={() => {
        if (enabled) {
          return stopVadAsr();
        }
        return startCustomAsr();
      }}
    >
      Record
    </Button>
  );
};

export const setupCustomAsrListeners = () => {};
