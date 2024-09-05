import { Card, Flex } from "@radix-ui/themes";
import type { AppReportAnswers, Chat } from "ai-worker-common";
import { Chats } from "ai-worker-common";
import type { CSSProperties } from "react";
import { memo } from "react";
import { DataObjectStates } from "../../../../state/data-object/DataObjectStates";
import { stringifyEq } from "../../stringifyEq";
import { ReportDisplay } from "./ReportDisplay";
import { factsToReports } from "./factsToReports";
import { useAppModesAndParams } from "../../../../state/location/useAppModesAndParams";
import { useIsPlayground } from "../../../playground/useIsPlayground";

export const ChatStateDisplay = memo(
  ({ style = {}, chat }: { chat: Chat; style?: CSSProperties }) => {
    const { modes } = useAppModesAndParams();
    // const isPlayground = useIsPlayground();
    const chatStateEntries = DataObjectStates.useChildDataObjects(
      chat.id,
      "chat-state-entry"
    ).filter((cse) => cse.namespace !== "aipl");

    if (!modes.includes("inspect")) {
      return <></>;
    }

    // TODO decorated facts
    const facts = Chats.chatStateEntriesToFacts(chatStateEntries);

    // console.log("ReportsDisplay chatDatas", { chatDatas, reports });

    const reports = factsToReports(facts);
    if (reports.length === 0) {
      return <></>;
    }

    // get only the last report of each by name
    // TODO visualize previous reports
    const reportByName: Record<string, AppReportAnswers> = {};
    for (const report of reports) {
      reportByName[report.name] = report;
    }
    const finalReports = Object.values(reportByName);

    return (
      <Card>
        <Flex
          wrap={"wrap"}
          style={{
            overflow: "auto",
            ...style,
          }}
          gap="1"
        >
          {finalReports.map((report, i) => (
            <ReportDisplay key={i} report={report} />
          ))}
        </Flex>
      </Card>
    );
  },
  stringifyEq
);
