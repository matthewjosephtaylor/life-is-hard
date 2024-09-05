import { Objects, isEmpty, isUndefined } from "@mjtdev/engine";
import { Button, Flex, Text } from "@radix-ui/themes";
import type { AppSecretStore } from "ai-worker-common";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { AppIconButton } from "../common/AppIconButton";
import { AppTextArea } from "../common/AppTextArea";
import { AppTable } from "../common/app-table/AppTable";

export const SecretStoreTable = ({
  storeId,
  onChange,
}: {
  storeId: string;
  onChange: (value: AppSecretStore | undefined) => void;
}) => {
  const secretStore = DataObjectStates.useDataObject<AppSecretStore>(storeId);
  const [recordsResult, setRecordsResult] = useState<
    {
      index: number;
      key: string;
      value: string;
    }[]
  >(produce([], () => {}));
  const [nameResult, setNameResult] = useState<string | undefined>(
    secretStore?.name
  );
  const [indexToIsUnmasked, setIndexToIsUnmasked] = useState(
    {} as Record<number, boolean>
  );

  useEffect(() => {
    const records = Objects.entries(secretStore?.records ?? {}).map(
      (entry, index) => {
        const [key, value] = entry;
        return {
          index,
          key,
          value,
        };
      }
    );
    setRecordsResult(produce(records, () => {}));
    setNameResult(secretStore?.name);
  }, [secretStore]);

  if (isUndefined(secretStore)) {
    return <>No secretStore for: {storeId}</>;
  }

  console.log("result", recordsResult);

  return (
    <Flex gap="1em" direction={"column"} align={"center"}>
      <AppTextArea
        defaultValue={secretStore.name}
        onChange={(value) => {
          setNameResult(value);
        }}
      />
      <Button
        onClick={() => {
          setRecordsResult(
            produce(recordsResult, (s) => {
              s.push({ index: s.length, key: "", value: "" });
            })
          );
        }}
        color="green"
      >
        Add Key
      </Button>
      <Text size="1">
        {
          "Keys should be in <namespace>.<key> format, where they will be used as AIPL chat-state variables"
        }
      </Text>
      <AppTable
        cellRenderMap={{
          action: (cell, row) => (
            <AppButtonGroup
              colors={{ delete: "red" }}
              actions={{
                delete: () => {
                  setRecordsResult(
                    produce(recordsResult, (s) => {
                      s.splice(row.index, 1);
                    })
                  );
                },
              }}
            />
          ),
          key: (cell, row) => (
            <AppTextArea
              key={"key-" + row.index}
              defaultValue={cell}
              onChange={(value) => {
                setRecordsResult(
                  produce(recordsResult, (s) => {
                    const record = s[row.index];
                    record.key = value;
                  })
                );
              }}
            />
          ),
          value: (cell, row) => {
            if (isEmpty(cell)) {
              setTimeout(() => {
                setIndexToIsUnmasked((cur) =>
                  produce(cur, (s) => {
                    s[row.index] = false;
                  })
                );
              });
            }
            return (
              <Flex gap={"1ch"}>
                <AppTextArea
                  isMasked={indexToIsUnmasked[row.index] ?? true}
                  key={"value-" + row.index}
                  defaultValue={cell}
                  onChange={(value) => {
                    setRecordsResult(
                      produce(recordsResult, (s) => {
                        s[row.index].value = value;
                      })
                    );
                  }}
                />
                <AppIconButton
                  onClick={() => {
                    setIndexToIsUnmasked(
                      produce(indexToIsUnmasked, (s) => {
                        s[row.index] = !(s[row.index] ?? true);
                      })
                    );
                  }}
                  tooltip={"Show"}
                >
                  {indexToIsUnmasked[row.index] ?? true ? (
                    <BiShow />
                  ) : (
                    <BiHide />
                  )}
                </AppIconButton>
              </Flex>
            );
          },
        }}
        headers={["index", "key", "value", "action"]}
        records={recordsResult}
      />
      <AppButtonGroup
        actions={{
          cancel: () => {
            onChange(undefined);
          },
          save: () => {
            console.log("save", recordsResult);
            onChange({
              ...secretStore,
              name: nameResult,
              records: Objects.fromEntries(
                recordsResult.map((r) => [r.key, r.value])
              ),
            });
          },
        }}
      />
    </Flex>
  );
};
