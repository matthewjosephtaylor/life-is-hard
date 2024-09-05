import { Grid, Flex, Separator, Heading, Card } from "@radix-ui/themes";
import { isDefined } from "@mjtdev/engine";
import { ReportFieldDisplay } from "./ReportFieldDisplay";
import type { AppReportAnswers } from "ai-worker-common";

export const ReportDisplay = ({ report }: { report: AppReportAnswers }) => {
  return (
    <Card
      style={{
        // backgroundColor: "red",
        // height: "fit-content"
      }}
    >
      <Flex align={"center"} direction={"column"}>
        <Heading size="1" style={{ minWidth: "fit-content" }}>
          {report.name}
        </Heading>
        <Flex wrap="wrap">
          {report.fields.filter(isDefined).map((field, i) => (
            <ReportFieldDisplay key={i} field={field} />
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};
