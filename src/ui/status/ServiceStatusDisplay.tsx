import { Objects } from "@mjtdev/engine";
import { Card, Flex, Text } from "@radix-ui/themes";
import { useServiceStatus } from "./ServiceStatus";
import { useIsUserGroup } from "../../state/user/useIsUserGroup";
import { useAppModesAndParams } from "../../state/location/useAppModesAndParams";
import { memo } from "react";

const STATUS_TO_COLOR = {
  ready: "🟢",
  busy: "🟡",
  error: "🔴",
};

export const ServiceStatusDisplay = memo(() => {
  const { modes } = useAppModesAndParams();
  const { services } = useServiceStatus();
  if (!modes.includes("monitor")) {
    return <></>;
  }

  const contents = Objects.entries(services)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((entry, i) => (
      <Card key={i}>
        <Flex align={"center"}>
          <Text style={{ marginRight: "0.3em" }}>
            {STATUS_TO_COLOR[entry[1]]}
          </Text>
          <Text
            style={{
              marginRight: "0.3em",
            }}
          >
            {entry[0]}
          </Text>
        </Flex>
      </Card>
    ));
  return (
    <Flex
      style={{ position: "absolute", bottom: "0.3em", right: "7em" }}
      direction={"row"}
    >
      {contents}
    </Flex>
  );
});
