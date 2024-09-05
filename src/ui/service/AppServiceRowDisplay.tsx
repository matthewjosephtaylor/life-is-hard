import { Button, Checkbox, Table, Text } from "@radix-ui/themes";
import type { AppService } from "ai-worker-common";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { openEditAppServicePopup } from "./openEditAppServicePopup";
import { SERVICE_COLUMNS } from "./SERVICE_COLUMNS";

export const AppServiceRowDisplay = ({ service }: { service: AppService }) => {
  const cellContentToReactNode = (content: unknown) => {
    const type = typeof content;
    switch (type) {
      case "boolean": {
        return content ? (
          <Text color="green">enabled</Text>
        ) : (
          <Text color="amber">disabled</Text>
        );
      }
    }
    return String(content);
  };
  return (
    <Table.Row>
      {SERVICE_COLUMNS.map((col, i) => (
        <Table.Cell key={i}>{cellContentToReactNode(service[col])}</Table.Cell>
      ))}
      <Table.Cell>
        <Button
          onClick={() => {
            openEditAppServicePopup(service);
          }}
        >
          Edit
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button
          onClick={() => {
            DataObjectStates.deleteDataObject(service.id);
          }}
          color="red"
        >
          Delete
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};


