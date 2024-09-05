import { Objects } from "@mjtdev/engine";
import { Table, Text } from "@radix-ui/themes";
import type { CSSProperties, ReactNode } from "react";
import { AppTableHeader } from "./AppTableHeader";

export type CellRenderMap<R> = {
  [k in keyof R | string]: (cell: k, row: R) => ReactNode;
};

export const AppTable = <
  R extends object,
  K extends keyof R | string = keyof R | string
>({
  style,
  headers,
  records,
  sort = (a, b) => 0,
  cellRenderMap = {},
}: {
  style?: CSSProperties;
  headers: K[] | Record<K, string | ((key: K, index: number) => ReactNode)>;
  records: Readonly<R[]>;
  sort?: (a: R, b: R) => number;
  cellRenderMap?: Partial<CellRenderMap<R>>;
}) => {
  const keys = Array.isArray(headers) ? headers : Objects.keys(headers);
  const rows = [...records].sort(sort).map((r, i) => (
    <Table.Row key={i}>
      {keys.map((k, j) => {
        // @ts-ignore
        const renderer = cellRenderMap[k];
        // @ts-ignore
        const cell = r[k];

        const cellContent = !renderer ? (
          <Text>{String(cell ?? "")}</Text>
        ) : (
          // @ts-ignore
          renderer(cell, r)
        );

        return <Table.Cell key={`${i}-${j}`}>{cellContent} </Table.Cell>;
      })}
    </Table.Row>
  ));

  return (
    <Table.Root style={style}>
      <AppTableHeader headers={headers} />
      <Table.Body>{rows}</Table.Body>
    </Table.Root>
  );
};
