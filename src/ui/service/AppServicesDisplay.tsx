import { Card, Strong, Table } from "@radix-ui/themes";
import type { AppService } from "ai-worker-common";
import { formatAndCapitalize } from "../../common/formatAndCapitalize";
import { AppServiceRowDisplay } from "./AppServiceRowDisplay";
import { SERVICE_COLUMNS } from "./SERVICE_COLUMNS";

export const AppServicesDisplay = ({
  services,
}: {
  services: Readonly<AppService[]>;
}) => {
  return (
    <Card>
      <Strong>Services</Strong>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {[...SERVICE_COLUMNS, "Edit", "Delete"].map((column, i) => (
              <Table.ColumnHeaderCell key={i}>
                {formatAndCapitalize(column)}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[...services]
            .sort((a, b) => {
              const { host: ah = "", domain: ad = "" } = a;
              const { host: bh = "", domain: bd = "" } = b;
              return `${ah}.${ad}`.localeCompare(`${bh}.${bd}`);
            })
            .map((service, i) => (
              <AppServiceRowDisplay key={i} service={service} />
            ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};
