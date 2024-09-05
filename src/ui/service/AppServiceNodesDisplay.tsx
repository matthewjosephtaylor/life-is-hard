import { Card, Strong, Table } from "@radix-ui/themes";
import type { AppServiceNode } from "ai-worker-common";
import { formatAndCapitalize } from "../../common/formatAndCapitalize";
import { AppServiceNodeRowDisplay } from "./AppServiceNodeRowDisplay";
import { SERVICE_NODE_COLUMNS } from "./SERVICE_NODE_COLUMNS";

export const AppServiceNodesDisplay = ({
  nodes,
}: {
  nodes: Readonly<AppServiceNode[]>;
}) => {
  return (
    <Card>
      <Strong>Service Nodes</Strong>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {[...SERVICE_NODE_COLUMNS, "Actions"].map((column, i) => (
              <Table.ColumnHeaderCell key={i}>
                {formatAndCapitalize(column)}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[...nodes]
            .sort((a, b) => {
              return (a.url ?? "").localeCompare(b?.url ?? "");
            })
            .map((node, i) => (
              <AppServiceNodeRowDisplay key={i} node={node} />
            ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};
