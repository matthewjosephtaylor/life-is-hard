import { isDefined } from "@mjtdev/engine";
import { Button, Card, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import type { CSSProperties } from "react";

export const AppDropDown = ({
  value,
  placeholder,
  title,
  values,
  onChange = () => {},
  style,
}: {
  style?: CSSProperties;
  value?: string;
  placeholder: string;
  title?: string;
  onChange?: (value: string) => void;
  values: Readonly<Record<string, string> | string[]>;
}) => {
  const entries = Array.isArray(values)
    ? values.map((v) => [v, v] as const)
    : Object.entries(values);

  const buttonEntry = entries.find((entry) => entry[0] === value) ?? [
    placeholder,
    placeholder,
  ];
  return (
    <Card style={style}>
      <Flex align={"center"} gap="2">
        {isDefined(title) && <Text>{title}</Text>}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button>{buttonEntry[1]}</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <Flex gap="1" direction={"column"}>
              {entries.map(([key, value], i) => (
                <DropdownMenu.Item key={i} onSelect={() => onChange(key)}>
                  <Flex style={{ userSelect: "none" }}>{value}</Flex>
                </DropdownMenu.Item>
              ))}
            </Flex>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Card>
  );
};
