import { Card, Flex, Select, Text } from "@radix-ui/themes";
import { formatAndCapitalize } from "../../common/formatAndCapitalize";

export const FormSelect = ({
  title,
  defaultValue,
  values,
  onChange = () => {},
}: {
  title: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  values: Record<string, string> | string[];
}) => {
  const entries = Array.isArray(values)
    ? values.map((v) => [v, v] as const)
    : Object.entries(values);
  const items = entries
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((entry, i) => (
      <Select.Item key={i} value={entry[0]}>
        <Text style={{ marginRight: "1em" }}>
          {formatAndCapitalize(entry[1])}
        </Text>
      </Select.Item>
    ));
  return (
    <Card>
      <Flex direction={"column"} style={{ maxWidth: "fit-content" }} gap="1">
        <Text as="label" size="2" mb="1" weight="bold">
          {title}
        </Text>
        <Select.Root onValueChange={onChange} defaultValue={defaultValue}>
          <Select.Trigger style={{ display: "block" }} />
          <Select.Content>{items}</Select.Content>
        </Select.Root>
      </Flex>
    </Card>
  );
};
