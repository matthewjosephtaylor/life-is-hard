import { Box, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import type { ChatMessage } from "ai-worker-common";
import { memo } from "react";
import { stringifyEq } from "../stringifyEq";
import { RxPencil2 } from "react-icons/rx";
import { MdCancel, MdSave } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

export const ChatMessageControls = memo(
  ({
    message,
    visible = true,
    onEditPress = () => {},
    onSavePress = () => {},
    onDeletePress = () => {},
    onCancelPress = () => {},
    editEnabled = true,
    saveEnabled = true,
    deleteEnabled = true,
    cancelEnabled = true,
  }: {
    message: ChatMessage;
    visible?: boolean;
    onEditPress?: () => void;
    editEnabled?: boolean;
    onSavePress?: () => void;
    saveEnabled?: boolean;
    onDeletePress?: () => void;
    deleteEnabled?: boolean;
    onCancelPress?: () => void;
    cancelEnabled?: boolean;
  }) => {
    return (
      <Flex
        style={{
          visibility: visible ? "visible" : "hidden",
        }}
        gap="2"
      >
        <Box flexGrow={"1"} />
        {cancelEnabled ? (
          <Tooltip content={"Cancel"}>
            <IconButton color="yellow" variant="outline">
              <MdCancel onClick={() => onCancelPress()} />
            </IconButton>
          </Tooltip>
        ) : undefined}
        {deleteEnabled ? (
          <Tooltip content={"Delete"}>
            <IconButton color="red" variant="outline">
              <MdDeleteForever onClick={() => onDeletePress()} />
            </IconButton>
          </Tooltip>
        ) : undefined}
        {saveEnabled ? (
          <Tooltip content={"Save"}>
            <IconButton color="green" variant="outline">
              <MdSave onClick={() => onSavePress()} />
            </IconButton>
          </Tooltip>
        ) : undefined}
        {editEnabled ? (
          <Tooltip content={"Edit"}>
            <IconButton variant="outline">
              <RxPencil2 onClick={() => onEditPress()} />
            </IconButton>
          </Tooltip>
        ) : undefined}
      </Flex>
    );
  },
  stringifyEq
);
