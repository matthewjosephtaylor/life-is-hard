import { Card, Flex, Separator, Text } from "@radix-ui/themes";
import type { AppMessageMap, Chat } from "ai-worker-common";
import { useEffect, useState } from "react";
import { AppEvents } from "../../../event/AppEvents";
import { useAppModesAndParams } from "../../../state/location/useAppModesAndParams";
import { PerfDisplay } from "../../perf/PerfDisplay";
import { Objects, updateState } from "@mjtdev/engine";
import { AppMessagesState } from "../../../state/ws/AppMessagesState";
import { AppButtonGroup } from "../../common/AppButtonGroup";
import { DebugAudioDisplay } from "./DebugAudioDisplay";
import { FormSelect } from "../../form/FormSelect";
import { FormCheckboxDisplay } from "../../form/FormCheckboxDisplay";
import { Returns } from "../../../state/data-object/Returns";
import { AppTable } from "../../common/app-table/AppTable";

export const ChatDebugDisplay = ({ chat }: { chat: Chat }) => {
  const { modes } = useAppModesAndParams();
  const [chatDebugPrompt, setChatDebugPrompt] = useState<string | undefined>(
    ""
  );
  const [state, setState] = useState({
    displays: new Set<"perf" | "audio" | "prompt" | "metrics">(),
  });

  AppEvents.useEventListener("chat:debug", (evt) => {
    console.log(evt);
    const { prompt } = evt.detail;
    setChatDebugPrompt(prompt);
  });
  if (!modes.includes("debug")) {
    return <></>;
  }
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "100ch",
        height: "100%",
        maxHeight: "90vh",
      }}
    >
      <Flex
        style={{ width: "100%", height: "100%" }}
        direction={"column"}
        gap="2"
      >
        <Flex gap="1">
          <FormCheckboxDisplay
            direction={"row"}
            defaultChecked={state.displays.has("perf")}
            onChange={(value) => {
              if (value) {
                state.displays.add("perf");
                setState({ displays: new Set(state.displays) });
              } else {
                state.displays.delete("perf");
                setState({ displays: new Set(state.displays) });
              }
            }}
            title={"perf"}
          />
          <FormCheckboxDisplay
            direction={"row"}
            defaultChecked={state.displays.has("audio")}
            onChange={(value) => {
              if (value) {
                state.displays.add("audio");
                setState({ displays: new Set(state.displays) });
              } else {
                state.displays.delete("audio");
                setState({ displays: new Set(state.displays) });
              }
            }}
            title={"audio"}
          />
          <FormCheckboxDisplay
            direction={"row"}
            defaultChecked={state.displays.has("prompt")}
            onChange={(value) => {
              if (value) {
                state.displays.add("prompt");
                setState({ displays: new Set(state.displays) });
              } else {
                state.displays.delete("prompt");
                setState({ displays: new Set(state.displays) });
              }
            }}
            title={"prompt"}
          />
          <FormCheckboxDisplay
            direction={"row"}
            defaultChecked={state.displays.has("metrics")}
            onChange={(value) => {
              if (value) {
                state.displays.add("metrics");
                setState({ displays: new Set(state.displays) });
              } else {
                state.displays.delete("perf");
                setState({ displays: new Set(state.displays) });
              }
            }}
            title={"metrics"}
          />
        </Flex>

        {state.displays.has("perf") ? (
          <>
            <AppButtonGroup
              actions={{
                enable: () => {
                  AppMessagesState.dispatch({
                    type: "app:debug:set",
                    detail: {
                      perfEnabled: true,
                      debugEnabled: true,
                    },
                  });
                },
                disable: () => {
                  AppMessagesState.dispatch({
                    type: "app:debug:set",
                    detail: {
                      perfEnabled: false,
                      debugEnabled: false,
                    },
                  });
                },
              }}
            />
            <Flex
              direction={"column"}
              gap="1"
              style={{
                maxHeight: "99%",
                overflowY: "auto",
              }}
            >
              <PerfDisplay />
            </Flex>
            <Separator size={"4"} />
          </>
        ) : undefined}
        {state.displays.has("audio") ? (
          <>
            <DebugAudioDisplay />
            <Separator size={"4"} />
          </>
        ) : undefined}
        {state.displays.has("metrics") ? <AppMetricsDisplay /> : undefined}
        {state.displays.has("prompt") ? (
          <>
            <Text
              style={{
                width: "40ch",
                maxHeight: "30vh",
                maxWidth: "80ch",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
                overflowY: "auto",
              }}
            >
              {chatDebugPrompt}
            </Text>
          </>
        ) : undefined}
      </Flex>
    </Card>
  );
};

export const AppMetricsDisplay = () => {
  const [state, setState] = useState({
    backend: {} as AppMessageMap["app:metrics:result"],
  });
  // console.log("state", state.backend.metrics);
  const records = Objects.entries(state.backend.metrics ?? {}).map((entry) => ({
    name: entry[0],
    value: entry[1].count,
  }));
  // console.log(records);
  return (
    <Flex
      direction={"column"}
      gap="2"
      style={{ maxHeight: "90vh", overflow: "auto" }}
    >
      <AppButtonGroup
        actions={{
          get: () => {
            const returnId = Returns.addReturnListener<
              AppMessageMap["app:metrics:result"]
            >({
              onReturn: (data) => {
                console.log(data);
                setState({ backend: data });
              },
            });
            AppMessagesState.dispatch({
              type: "app:metrics:get",
              detail: { returnId },
            });
          },
          reset: () => {
            AppMessagesState.dispatch({
              type: "app:metrics:reset",
              detail: undefined,
            });
            setState({ backend: { metrics: {} } });
          },
        }}
      />
      <AppTable records={records} headers={["name", "value"]} />
      {/* {Objects.entries(state.backend).map(entry => <Flex></Flex>)} */}
    </Flex>
  );
};
