import { Card, Checkbox, Flex, Text, Tooltip } from "@radix-ui/themes";
import { produce } from "immer";
import { useState } from "react";

export const MultipleChoiceDisplay = ({
  defaultValue = [],
  possibleValues,
  names,
  tooltips = {},
  onChange,
}: {
  names: Record<string, string>;
  tooltips?: Record<string, string>;
  onChange: (values: string[]) => void;
  defaultValue?: string[];
  possibleValues: string[];
}) => {
  const [result, setResult] = useState(
    produce({ values: [] as string[] }, (s) => {
      s.values = defaultValue;
    })
  );
  return (
    <Flex wrap={"wrap"} gap="2">
      {possibleValues.map((possible, i) => (
        <Card
          style={{ userSelect: "none" }}
          key={i}
          onClick={() => {
            const currentlyIncluded = result.values.includes(possible);
            const updated = produce(result, (r) => {
              // easier logic to remove first
              r.values = r.values.filter((v) => v !== possible);
              if (!currentlyIncluded) {
                r.values.push(possible);
              }
            });
            setResult(updated);
            onChange(updated.values);
          }}
        >
          <Tooltip content={tooltips[possible] ?? possible}>
            <Flex align={"center"} gap="2">
              <Checkbox checked={result.values.includes(possible)} />
              <Text>{names[possible]}</Text>
            </Flex>
          </Tooltip>
        </Card>
      ))}
    </Flex>
  );
};
