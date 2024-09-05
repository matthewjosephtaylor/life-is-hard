import { Objects, Reacts, createState } from "@mjtdev/engine";
import { Box, Container, Flex, Strong } from "@radix-ui/themes";
import type { CSSProperties } from "react";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { FormInputDisplay } from "./FormInputDisplay";
import type { StringKeys } from "./StringKeys";

export const FormEditor = <
  T extends Record<string, string>,
  K extends StringKeys<T> = StringKeys<T>
>({
  defaultValue,
  onSubmit,
  keys = Objects.keys(defaultValue).sort() as K[],
  fieldStyles = {},
  focusField,
  title,
}: {
  title?: string;
  defaultValue: T;
  keys?: K[];
  fieldStyles?: Partial<Record<K, CSSProperties>>;
  focusField?: K;
  onSubmit: (value: T | undefined) => void;
}) => {
  const [usePopupState, updatePopupState, getPopupState] =
    createState<T>(defaultValue);
  const state = usePopupState();
  Reacts.useKeyboardListener({
    ENTER: () => onSubmit(getPopupState()),
  });
  const contents = keys.map((key, i) => {
    return (
      <FormInputDisplay<T[K]>
        key={i}
        style={fieldStyles[key]}
        title={String(key)}
        autoFocus={key === focusField}
        defaultValue={state[key]}
        onChange={(value) => {
          updatePopupState((state) => {
            state[key] = value;
          });
        }}
      />
    );
  });

  return (
    <Flex style={{ margin: "3em" }} gap="4" direction="column" title={title}>
      <Container>
        <Flex gap="4" direction={"column"}>
          <Strong style={{ whiteSpace: "nowrap" }}>{title ?? ""}</Strong>
          {contents}
          <Flex align={"center"}>
            <Box flexGrow="1" />
            <AppButtonGroup
              actions={{
                OK: () => onSubmit(getPopupState()),
              }}
            />
            <Box flexGrow="1" />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};
