import { Dialog, Flex } from "@radix-ui/themes";
import type { CSSProperties, ReactNode } from "react";
import { updateAppPopupState } from "./AppPopupState";
import { closeAppPopup } from "./closeAppPopup";

export const openAppPopup = (
  node: ReactNode,
  options: Partial<{
    onClose: () => void;
    size: "1" | "2" | "3" | "4";
    style: CSSProperties;
  }> = {}
) => {
  const { onClose = () => {}, size = "1", style = {} } = options;
  updateAppPopupState((s) => {
    const contentsLength = s.popupContents.push(
      <Dialog.Root
        key={"app-popup-" + crypto.randomUUID()}
        onOpenChange={(open) => {
          if (!open) {
            updateAppPopupState((s) => {
              delete s.popupContents[contentsLength - 1];
            });
            onClose();
          }
        }}
        defaultOpen={true}
      >
        <Dialog.Content
          size={size}
          style={{
            maxWidth: "fit-content",
            ...style,
          }}
          onKeyUp={(evt) => {
            if (evt.key === "Escape") {
              closeAppPopup();
            }
          }}
        >
          <Flex align={"center"} direction={"column"}>
            {node}
          </Flex>
          {/* <Flex>
            <IconButton
              onClick={() => {
                closeAppPopup();
              }}
              size={"1"}
              variant="outline"
              style={{
                backgroundColor: "var(--color-panel-solid)",
                position: "absolute",
                right: "-1em",
                top: "-1em",
                borderRadius: "50%",
              }}
            >
              <IoClose />
            </IconButton>
          </Flex> */}
        </Dialog.Content>
      </Dialog.Root>
    );
  });
};
