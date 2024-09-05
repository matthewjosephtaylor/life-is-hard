import { Card, Flex, Text, TextField, Tooltip } from "@radix-ui/themes";
// import type { TextFieldInputProps } from "@radix-ui/themes/dist/cjs/components/text-field";
// import type { TextFieldInputProps } from "@radix-ui/themes/

export const FormInputDisplay = <T extends string = string>({
  title,
  onChange = () => {},
  ...rest
}: Omit<TextField.RootProps, "onChange"> & {
  title: string;
  onChange?: (
    value: T
  ) => (T | void | undefined) | Promise<T | void | undefined>;
}) => {
  return (
    <Card style={{ height: "fit-content", width: "fit-content" }}>
      <Flex gap="1" direction={"column"}>
        <Text as="label" size="2" mb="1" weight="bold">
          {title}
        </Text>

        <Tooltip
          style={{ visibility: rest.defaultValue ? "visible" : "hidden" }}
          content={rest.defaultValue ?? ""}
        >
          <TextField.Root
            onChange={(evt) => {
              onChange(evt.currentTarget.value as T);
            }}
            {...rest}
          />
        </Tooltip>
      </Flex>
    </Card>
  );
};
