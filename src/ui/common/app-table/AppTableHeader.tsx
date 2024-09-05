import { Objects } from "@mjtdev/engine";
import { Table } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { formatAndCapitalize } from "../../../common/formatAndCapitalize";

export const AppTableHeader = <K extends string | number | symbol>({
  headers,
}: {
  headers: K[] | Record<K, string | ((key: K, index: number) => ReactNode)>;
}) => {
  const headersMap = Array.isArray(headers)
    ? Objects.fromEntries(headers.map((h) => [h, h]))
    : headers;

  const headerCells = Objects.entries(headersMap).map(([key, valueOrFunc], i) =>
    typeof valueOrFunc === "function"
      ? valueOrFunc(key, i)
      : formatAndCapitalize(valueOrFunc as string)
  );

  return (
    <Table.Header>
      <Table.Row>
        {headerCells.map((cell, i) => (
          <Table.ColumnHeaderCell key={i}>{cell}</Table.ColumnHeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
};
