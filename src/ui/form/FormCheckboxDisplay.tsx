import { Card, Checkbox, Flex, Text, type FlexProps } from "@radix-ui/themes";
import type { CheckboxProps } from "@radix-ui/themes/dist/cjs/components/checkbox";

export const FormCheckboxDisplay = <T extends boolean = boolean>({
  title,
  onChange = () => {},
  direction = "column",
  ...rest
}: Omit<CheckboxProps, "onChange"> & {
  direction?: FlexProps["direction"];
  title: string;
  tooltip?: string;
  onChange?: (
    value: T
  ) => (T | void | undefined) | Promise<T | void | undefined>;
}) => {
  return (
    <Card>
      <Flex direction={direction} style={{ maxWidth: "100%" }} gap="2">
        <Text as="label" size="2" mb="1" weight="bold">
          {title}
        </Text>
        <Checkbox
          onCheckedChange={(state) => {
            onChange((typeof state === "boolean" ? state : false) as T);
          }}
          {...rest}
        />
      </Flex>
    </Card>
  );
};
