import { Button, Flex, Grid } from "@radix-ui/themes";
import type {
  AppReport} from "ai-worker-common/dist/type/app-report/AppReport";
import { useState } from "react";
import { FormInputDisplay } from "../../form/FormInputDisplay";
import { produce } from "immer";
import { AppReportFieldEditor } from "./AppReportFieldEditor";


export const AppReportEditor = ({
  defaultValue, onChange,
}: {
  defaultValue: AppReport;
  onChange: (report: AppReport) => void;
}) => {
  const [report, setReport] = useState(produce(defaultValue, () => { }));
  return (
    <Flex gap="2" direction={"column"}>
      <FormInputDisplay
        title={"name"}
        defaultValue={report.name}
        onChange={(value) => {
          const updated = produce(report, (r) => {
            r.name = value;
          });
          setReport(updated);
          onChange(updated);
        }} />
      <Button
        onClick={() => {
          const updated = produce(report, (r) => {
            r.fields.push({
              name: "New Field",
              description: "",
            });
          });
          setReport(updated);
          onChange(updated);
        }}
      >
        Add Field
      </Button>
      <Grid gap="2" columns={"1"}>
        {report.fields.map((field, i) => (
          <AppReportFieldEditor
            defaultValue={field}
            key={i}
            onDelete={() => {
              const updated = produce(report, (r) => {
                r.fields = r.fields.filter((_, ii) => ii !== i);
              });
              setReport(updated);
              onChange(updated);
            }}
            onChange={(field) => {
              const updated = produce(report, (r) => {
                r.fields[i] = field;
              });
              setReport(updated);
              onChange(updated);
            }} />
        ))}
      </Grid>
    </Flex>
  );
};


