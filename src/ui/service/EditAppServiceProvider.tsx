import { Box, Button, Flex, Text } from "@radix-ui/themes";
import type { ApiShape, AppServiceProvider } from "ai-worker-common";
import {
  SERVICE_PROVIDER_EXTRA_KEYS,
  SERVICE_TYPE_TO_API_SHAPES,
} from "ai-worker-common";
import { produce } from "immer";
import { useState } from "react";
import { FormSelect } from "../form/FormSelect";
import { FormFields } from "../user/FormFields";
import { SERVICE_PROVIDER_KEY_TO_FIELD_TYPE } from "../user/SERVICE_PROVIDER_KEY_TO_FIELD_TYPE";
import { AppButtonGroup } from "../common/AppButtonGroup";
export const EditAppServiceProvider = ({
  defaultValue,
  onSubmit,
  // serviceType,
  // extraKeys = [],
  keys = ["authToken", "baseUrl", "model"],
}: {
  keys?: (keyof AppServiceProvider)[];
  // extraKeys?: (keyof AppServiceProvider)[];
  // serviceType: AppService["type"];
  defaultValue: Partial<AppServiceProvider>;
  onSubmit: (value: Partial<AppServiceProvider> | undefined) => void;
}) => {
  const [result, setResult] = useState(produce(defaultValue, () => {}));

  const { type: serviceType = "unknown" } = result;
  const extraKeys = SERVICE_PROVIDER_EXTRA_KEYS[serviceType] ?? [];

  return (
    <Flex direction={"column"} gap="4">
      <Flex align={"center"}>
        <Text style={{ textTransform: "capitalize" }}>
          {serviceType} Service Configuration
        </Text>
      </Flex>
      <Flex gap="2" direction={"column"}>
        <FormSelect
          defaultValue={result.apiShape}
          onChange={(value) => {
            setResult(
              produce(result, (r) => {
                r.apiShape = value as ApiShape;
              })
            );
          }}
          title={"API Shape"}
          values={Object.fromEntries(
            SERVICE_TYPE_TO_API_SHAPES[serviceType].map(
              (shape) => [shape, shape] as const
            )
          )}
        />
        <FormFields
          keys={[...keys, ...extraKeys]}
          defaultValue={defaultValue}
          formFieldTypeMap={SERVICE_PROVIDER_KEY_TO_FIELD_TYPE}
          onChange={(key, value): void => {
            setResult(
              produce(result, (r) => {
                /** @ts-ignore */
                r[key] = value;
              })
            );
          }}
        />
      </Flex>
      <Flex>
        <Box flexGrow={"1"} />
        <AppButtonGroup
          colors={{ cancel: "gray" }}
          actions={{
            save: () => {
              onSubmit(result);
            },
            cancel: () => {
              onSubmit(undefined);
            },
          }}
        />

        <Box flexGrow={"1"} />
      </Flex>
    </Flex>
  );
};
