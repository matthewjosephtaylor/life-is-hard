import { Button, Flex } from "@radix-ui/themes";
import type { AppReportField } from "ai-worker-common/dist/type/app-report/AppReport";
import { useState } from "react";
import { FormInputDisplay } from "../../form/FormInputDisplay";
import { FormTextAreaDisplay } from "../../form/FormTextAreaDisplay";
import { produce } from "immer";


export const AppReportFieldEditor = ({
  defaultValue, onChange, onDelete,
}: {
  defaultValue: AppReportField;
  onChange: (field: AppReportField) => void;
  onDelete: () => void;
}) => {
  const [field, setField] = useState(produce(defaultValue, () => { }));
  return (
    <Flex gap="2" direction={"column"}>
      <Flex gap="2">
        <Button onClick={() => onDelete()} color="red">
          X
        </Button>
        <Flex gap="2">
          <FormInputDisplay
            defaultValue={field.name}
            onChange={(value) => {
              const updated = produce(field, (f) => {
                f.name = value;
              });
              setField(updated);
              onChange(updated);
            }}
            title={"name"} />
        </Flex>
        <FormTextAreaDisplay
          defaultValue={field.description}
          onChange={(value) => {
            const updated = produce(field, (f) => {
              f.description = value;
            });
            setField(updated);
            onChange(updated);
          }}
          title={"description"} />
      </Flex>
    </Flex>
  );
};
