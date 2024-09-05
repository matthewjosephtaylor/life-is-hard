import { isDefined } from "@mjtdev/engine";
import { Button, Flex, Grid, Separator, Tabs } from "@radix-ui/themes";
import type {
  AppReport,
} from "ai-worker-common/dist/type/app-report/AppReport";
import { useState } from "react";
import { produce } from "immer";
import { AppReportEditor } from "./report/AppReportEditor";

export const CharacterReportsTabContent = ({
  tabKey,
  defaultValue,
  onChange,
  onReportChange,
}: {
  tabKey: string;
  defaultValue: AppReport[];
  onChange: (reports: AppReport[]) => void;
  onReportChange: (index: number, report: AppReport | undefined) => void;
}) => {
  // const [report, setReport] = useState<AppReport | undefined>(undefined);
  const [reportTab, setReportTab] = useState<string | undefined>();
  const [reports, setReports] = useState(produce(defaultValue, () => {}));
  return (
    <Tabs.Content key={tabKey} value={tabKey}>
      <Flex
        style={{ maxHeight: "30em", overflow: "auto" }}
        gap="2"
        direction={"column"}
      >
        <Flex>
          <Button
            onClick={() => {
              const updated = produce(reports, (rs) => {
                rs.push({
                  name: "New Report",
                  fields: [],
                });
              });
              setReports(updated);
              onChange(updated);
            }}
          >
            Add Report
          </Button>
        </Flex>
        <Separator size={"4"} />
        <Grid columns={"2"} gap="2">
          {reports.filter(isDefined).map((report, i) => (
            <Flex key={i}>
              <Button
                variant="outline"
                color={`${i}` === reportTab ? "amber" : undefined}
                onClick={() => {
                  setReportTab(`${i}`);
                }}
              >
                {report.name}
              </Button>
              <Button
                onClick={() => {
                  setReportTab(undefined);
                  const updated = produce(reports, (rs) => {
                    delete rs[i];
                  });
                  setReports(updated);
                  onChange(updated);
                  // onReportChange(i, undefined);
                }}
                color="red"
              >
                X
              </Button>
            </Flex>
          ))}
        </Grid>

        <Separator size={"4"} />

        <Tabs.Root value={reportTab}>
          <Flex gap="2">
            {reports.filter(isDefined).map((report, i) => (
              <Tabs.Content key={i} value={`${i}`}>
                <AppReportEditor
                  defaultValue={report}
                  onChange={
                    (value) => {
                      const updated = produce(reports, (rs) => {
                        rs[i] = value;
                      });
                      setReports(updated);
                      onChange(updated);
                    }

                    // onReportChange(i, value)
                  }
                />
              </Tabs.Content>
            ))}
          </Flex>
        </Tabs.Root>
      </Flex>
    </Tabs.Content>
  );
};

