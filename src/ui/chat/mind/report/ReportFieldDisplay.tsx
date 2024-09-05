import { Text, Flex, Card } from "@radix-ui/themes";
import { Colors } from "@mjtdev/engine";
import { idToColor } from "../../../visual/idToColor";
import type { AppReportFieldAnswer } from "ai-worker-common";

export const ReportFieldDisplay = ({
  field,
}: {
  field: AppReportFieldAnswer;
}) => {
  const backgroundColor = idToColor(field.name);
  const color = Colors.textColor([backgroundColor]);
  return (
    <Card
    // style={{ width: "99%", height: "99%" }}
    >
      <Flex
        // style={{ width: "100%", height: "100%" }}
        align={"center"}
        direction={"column"}
        gap="2"
      >
        <Text
          size="1"
          align={"center"}
          style={{
            minWidth: "fit-content",
            width: "100%",
            color,
            backgroundColor,
          }}
        >
          {field.name}
        </Text>
        <Flex
          style={{
            minWidth: "fit-content",
          }}
          flexGrow="1"
        >
          <Text size={"1"}>{field.answer}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};
