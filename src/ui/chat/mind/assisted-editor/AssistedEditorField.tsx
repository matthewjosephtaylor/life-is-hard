import { Card, Flex, Strong, Text } from "@radix-ui/themes";
import { memo } from "react";
import { stringifyEq } from "../../stringifyEq";


export const AssistedEditorField = memo(
  ({ fieldName, value }: { fieldName: string; value?: string; }) => {
    return (
      <Card>
        <Flex style={{ maxWidth: "20em" }} direction={"column"} gap="2">
          <Strong>{fieldName}</Strong>
          <Text>{value}</Text>
        </Flex>
      </Card>
    );
  },
  stringifyEq
);
