import { isEmpty } from "@mjtdev/engine";
import { Button, Flex } from "@radix-ui/themes";
import type {
  FormSkillConfig,
  FormSkillConfigKeyValue,
} from "ai-worker-common";
import { produce } from "immer";
import { AppTable } from "../common/app-table/AppTable";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { AppDropDown } from "../common/AppDropDown";
import { AppTextArea } from "../common/AppTextArea";
import { openFormEditorPopup } from "../form/openFormEditorPopup";

export const FormSkillConfigEditor = ({
  defaultValue = {},
  onChange,
  onRename,
  onDelete,
}: {
  defaultValue?: FormSkillConfig;
  onChange: (name: string, value: FormSkillConfigKeyValue) => void;
  onRename: (oldName: string, newName: string) => void;
  onDelete: (name: string) => void;
}) => {
  const records = Object.entries(defaultValue).map(([key, value]) => {
    const { values, ...rest } = value;
    return { name: key, values: values.join(", "), ...rest };
  });

  const recordToFormSkillConfigKeyValue = (
    record: (typeof records)[number]
  ) => {
    const { name, values, ...rest } = record;
    return {
      values: values.split(",").map((v) => v.trim()),
      ...rest,
    };
  };

  return (
    <Flex direction="column" gap="2">
      <Flex>
        <Button
          onClick={async () => {
            const form = await openFormEditorPopup<Partial<{ name: string }>>(
              { name: "" },
              {
                title: `New Form Key`,
                fieldStyles: { name: { width: "20ch" } },
              }
            );
            const formName = form?.name;
            if (!formName || isEmpty(formName)) {
              return;
            }
            onChange(formName, {
              inputValueType: "single",
              selector: "",
              values: [],
              description: "",
            });
          }}
        >
          Add Key
        </Button>
      </Flex>

      <AppTable
        headers={[
          "name",
          "selector",
          "values",
          "inputValueType",
          "description",
          "actions",
        ]}
        cellRenderMap={{
          name: (cell, row) => {
            return (
              <AppTextArea
                defaultValue={cell}
                onChange={(value) => {
                  onRename(row.name, value);
                }}
              />
            );
          },
          selector: (cell, row) => {
            return (
              <AppTextArea
                defaultValue={cell}
                onChange={(value) => {
                  const updated = produce(row, (draft) => {
                    draft.selector = value;
                  });
                  onChange(row.name, recordToFormSkillConfigKeyValue(updated));
                }}
              />
            );
          },
          values: (cell, row) => {
            return (
              <AppTextArea
                defaultValue={cell}
                onChange={(value) => {
                  const updated = produce(row, (draft) => {
                    draft.values = value;
                  });
                  onChange(row.name, recordToFormSkillConfigKeyValue(updated));
                }}
              />
            );
          },
          inputValueType: (cell, row) => {
            return (
              <AppDropDown
                values={[
                  "single",
                  "multiple",
                  "text",
                  "video" as FormSkillConfigKeyValue["inputValueType"],
                ]}
                value={cell}
                placeholder="single"
                onChange={(value) => {
                  const updated = produce(row, (draft) => {
                    draft.inputValueType = value as "single" | "multiple";
                  });
                  onChange(row.name, recordToFormSkillConfigKeyValue(updated));
                }}
              />
            );
          },
          description: (cell, row) => {
            return (
              <AppTextArea
                defaultValue={cell}
                onChange={(value) => {
                  const updated = produce(row, (draft) => {
                    draft.description = value;
                  });
                  onChange(row.name, recordToFormSkillConfigKeyValue(updated));
                }}
              />
            );
          },

          actions: (_cell, row) => (
            <AppButtonGroup
              colors={{ delete: "red" }}
              actions={{
                delete: () => {
                  onDelete(row.name);
                },
              }}
            />
          ),
        }}
        records={records}
      />
    </Flex>
  );
};
