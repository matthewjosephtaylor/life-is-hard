import { Button, Flex, Table, Text } from "@radix-ui/themes";
import type { AppServiceNode } from "ai-worker-common";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { SERVICE_NODE_COLUMNS } from "./SERVICE_NODE_COLUMNS";
import { FormSelect } from "../form/FormSelect";

export const AppServiceNodeRowDisplay = ({
  node,
}: {
  node: AppServiceNode;
}) => {
  const cellContentToReactNode = (
    key: keyof AppServiceNode,
    content: string | undefined
  ) => {
    switch (key) {
      case "status": {
        switch (content as AppServiceNode["status"]) {
          case "busy": {
            return <Text color="amber">{content}</Text>;
          }
          case "offline": {
            return <Text color="red">{content}</Text>;
          }
          case "ready": {
            return <Text color="green">{content}</Text>;
          }
        }
      }
    }
    return String(content);
  };
  const serviceStatuses: AppServiceNode["status"][] = [
    "busy",
    "ready",
    "offline",
  ];
  return (
    <Table.Row>
      {SERVICE_NODE_COLUMNS.map((col, i) => (
        <Table.Cell key={i}>
          {cellContentToReactNode(col, node[col])}
        </Table.Cell>
      ))}
      <Table.Cell>
        <Flex align={"center"} gap="2">
          <Button
            onClick={() => {
              DataObjectStates.deleteDataObject(node.id);
            }}
            color="red"
          >
            Delete
          </Button>

          <FormSelect
            defaultValue={node.status}
            onChange={(value) => {
              DataObjectStates.mutateDataObject<AppServiceNode>(
                node.id,
                (n) => {
                  n.status = value as AppServiceNode["status"];
                }
              );
            }}
            title={"change status"}
            values={serviceStatuses}
          />
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};
