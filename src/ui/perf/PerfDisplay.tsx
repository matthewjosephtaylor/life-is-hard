import { Colors, createState, first, isUndefined } from "@mjtdev/engine";
import { Flex, Text } from "@radix-ui/themes";
import type { AppMessageMap } from "ai-worker-common";
import { AppEvents } from "../../event/AppEvents";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { AppTable } from "../common/app-table/AppTable";
import { idToColor } from "../visual/idToColor";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
// import { useState } from "react";

const [useState, updateState, getState] = createState({
  performanceItems: [] as AppMessageMap["app:performance"][],
});

export const PerfDisplay = () => {
  // const [state, setState] = useState({
  //   performanceItems: [] as AppMessageMap["app:performance"][],
  // });
  AppEvents.useEventListener("app:performance", (evt) => {
    updateState((s) => {
      if (evt.detail.mark) {
        s.performanceItems.length = 0;
      }
      s.performanceItems.push(evt.detail);
      s.performanceItems.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
    });
  });
  const state = useState();

  const refTime = first(state.performanceItems)?.timestamp ?? Date.now();

  type PerfRecord = {
    scope: string;
    timestamp: number;
    loc: string;
    message?: string;
    cumulative: number;
    parent?: string;
    delta: number;
  };
  const records: PerfRecord[] = state.performanceItems.map((p) => ({
    scope: p.scope ?? "",
    loc: p.location,
    message: p.message,
    timestamp: p.timestamp - refTime,
    delta: p.delta,
    cumulative: p.cumulative,
    parent: p.parent,
  }));

  const coloredRenderer = (cell: string) => {
    if (isUndefined(cell)) {
      return undefined;
    }
    const background = idToColor(cell);
    const color = Colors.textColor([background]);
    return (
      <Flex style={{ color, backgroundColor: idToColor(cell) }}>
        <Text m="1">{cell}</Text>
      </Flex>
    );
  };

  return (
    <Flex style={{ width: "fit-content", height: "100%" }} direction={"column"}>
      <AppButtonGroup
        actions={{
          clearPerf: () => {
            updateState((s) => {
              s.performanceItems.length = 0;
            });
          },
        }}
      />
      <AppTable
        cellRenderMap={{
          loc: coloredRenderer,
          parent: coloredRenderer,
        }}
        headers={[
          "scope",
          "timestamp",
          "delta",
          "cumulative",
          "parent",
          "loc",
          "message",
        ]}
        records={records}
      />
    </Flex>
  );
};
