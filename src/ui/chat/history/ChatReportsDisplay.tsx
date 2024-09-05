import { Flex } from "@radix-ui/themes";
import type { Chat } from "ai-worker-common";
import { AppButtonGroup } from "../../common/AppButtonGroup";
import { openAppPopup } from "../../popup/openAppPopup";
import { MarkdownTextDisplay } from "../message/MarkdownTextDisplay";
import { useChatReports } from "./useChatReports";


export const ChatReportsDisplay = ({ chat }: { chat: Chat; }) => {
  const reports = useChatReports(chat);
  return (
    <Flex wrap={"wrap"} gap="2">
      {reports.map((r, i) => (
        <AppButtonGroup
          key={i}
          colors={{ deleteReport: "red" }}
          actions={{
            openReport: () => {
              openAppPopup(<MarkdownTextDisplay text={r.value ?? ""} />);
            },
            deleteReport: () => {
              openAppPopup(<MarkdownTextDisplay text={r.value ?? ""} />);
            },
          }} />
      ))}
    </Flex>
  );
};
