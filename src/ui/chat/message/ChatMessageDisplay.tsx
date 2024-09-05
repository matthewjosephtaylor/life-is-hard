import { isEmpty, isUndefined } from "@mjtdev/engine";
import { Card, Flex, TextArea, Tooltip } from "@radix-ui/themes";
import type { AppCharacter, ChatMessage } from "ai-worker-common";
import { AiFunctions, Chats } from "ai-worker-common";
import { memo, useEffect, useRef, useState } from "react";
import { CharacterAvatar } from "../../character/CharacterAvatar";

import { produce } from "immer";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { stringifyEq } from "../stringifyEq";
import { ChatMessageControls } from "./ChatMessageControls";
import { MarkdownTextDisplay } from "./MarkdownTextDisplay";

export const ChatMessageDisplay = memo(
  ({
    // messageId,
    message,
    characters,
    onChange = () => {},
    onDelete = () => {},
    enableControls = false,
  }: {
    enableControls?: boolean;
    characters: Record<string, AppCharacter>;
    // messageId: string;
    message: ChatMessage;
    onChange?: (message: ChatMessage) => void;
    onDelete?: () => void;
  }) => {
    const [pointerOver, setPointerOver] = useState(false);
    const [state, setState] = useState(produce({ editText: false }, () => {}));
    const functionResults = DataObjectStates.useChildDataObjects(
      message.id,
      "function-call-result"
    );
    const textRef = useRef<HTMLTextAreaElement>(null);
    const topRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!topRef.current) {
        return;
      }
      const scroll = () => {
        if (state.editText) {
          return;
        }
        topRef?.current?.scrollIntoView({
          behavior: "instant",
          block: "end",
        });
      };
      const observer = new ResizeObserver(() => {
        scroll();
      });
      scroll();
      observer.observe(topRef.current);
      return () => {
        observer.disconnect();
      };
    }, [topRef, message, characters, state]);
    if (isUndefined(message)) {
      return <></>;
    }

    const { role } = message;
    const parseResult = AiFunctions.parseAiFunctionText(
      Chats.chatMessageToText(message),
      { aiFunctionPrefix: ".?" }
    );
    if (isUndefined(parseResult) || isEmpty(parseResult.strippedText)) {
      return undefined;
    }

    const textDisplay =
      message.role === "assistant" && isEmpty(parseResult.strippedText) ? (
        "..."
      ) : state.editText ? (
        <Flex>
          <TextArea
            ref={textRef}
            autoFocus={true}
            style={{ width: "20em" }}
            rows={5}
            defaultValue={parseResult.strippedText}
          />
        </Flex>
      ) : (
        <MarkdownTextDisplay
          text={parseResult.strippedText.replaceAll(
            AiFunctions.AI_FUNCTION_SYMBOL,
            ""
          )}
        />
      );

    const imageResults = functionResults.filter((fcr) => fcr?.type === "image");
    const imgDisplay = (
      <Flex wrap="wrap" gap="2">
        {imageResults.map((functionCallResult, j) => {
          return (
            <Tooltip key={j} content={functionCallResult.prompt ?? ""}>
              <img
                style={{ maxWidth: "20em", maxHeight: "20em" }}
                title="image"
                src={`data:image/*;base64,${functionCallResult.value}`}
              />
            </Tooltip>
          );
        })}
      </Flex>
    );

    const character = message.characterId
      ? characters[message?.characterId]
      : undefined;
    const avatar = character ? (
      <CharacterAvatar
        hoverActions={["Chat With {char}"]}
        showHoverButtons={false}
        imageStyle={{ maxHeight: "4em" }}
        character={character}
        showName={false}
        showContextMenu={false}
        enableDocumentDrop={false}
      />
    ) : undefined;

    return (
      <Flex
        direction={role === "assistant" ? "row" : "row-reverse"}
        ref={topRef}
        gap="9"
        flexShrink="1"
        style={{
          // height: "100%",
          width: "100%",
          paddingTop: "0.5em",
          paddingRight: "1em",
        }}
        onPointerEnter={() => {
          setPointerOver(true);
        }}
        onPointerLeave={() => {
          setPointerOver(false);
        }}
        onKeyUp={(evt) => {
          if (evt.key === "Escape") {
            setState(
              produce(state, (s) => {
                s.editText = false;
              })
            );
          }
        }}
      >
        <Flex direction={"column"} gap="2">
          <Card>
            <Flex
              direction={role === "assistant" ? "row" : "row-reverse"}
              gap="5"
              flexShrink="1"
              align={"center"}
            >
              <Flex flexShrink={"1"}>{avatar}</Flex>
              <Flex
                data-role={message.role}
                style={{
                  overflow: "auto",
                }}
                direction="column"
                gap="2"
              >
                {textDisplay}
                {imgDisplay}
              </Flex>
            </Flex>
          </Card>
          {enableControls ? (
            <ChatMessageControls
              saveEnabled={state.editText}
              editEnabled={!state.editText}
              cancelEnabled={state.editText}
              deleteEnabled={!state.editText}
              onDeletePress={() => onDelete()}
              onCancelPress={() => {
                setState(
                  produce(state, (s) => {
                    s.editText = false;
                  })
                );
              }}
              onEditPress={() =>
                setState(
                  produce(state, (s) => {
                    s.editText = true;
                  })
                )
              }
              onSavePress={() => {
                setState(
                  produce(state, (s) => {
                    s.editText = false;
                  })
                );
                if (textRef.current) {
                  onChange({
                    ...message,
                    content: { type: "text", parts: [textRef.current?.value] },
                  });
                }
              }}
              visible={pointerOver}
              message={message}
            />
          ) : undefined}
        </Flex>
      </Flex>
    );
  },
  stringifyEq
);
