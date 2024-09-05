import { isUndefined } from "@mjtdev/engine";
import { Flex, Separator } from "@radix-ui/themes";
import type { AppUserProfile } from "ai-worker-common";
import { produce } from "immer";
import { useState } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { FormInputDisplay } from "../form/FormInputDisplay";
import { EditAppServiceProviders } from "./EditAppServiceProviders";
import { AppButtonGroup } from "../common/AppButtonGroup";

export const EditUserProfileDialog = ({
  defaultValue,
  onSubmit,
}: {
  defaultValue: AppUserProfile | undefined;
  onSubmit: (profile: AppUserProfile | undefined) => void;
}) => {
  const [result, setResult] = useState(produce(defaultValue, () => {}));
  const configuredProviders = DataObjectStates.useChildDataObjects(
    result?.id,
    "app-service-provider"
  );

  if (isUndefined(result)) {
    return <></>;
  }

  return (
    <Flex
      style={{ overflow: "auto", maxHeight: "80vh" }}
      gap="4"
      direction={"column"}
    >
      <Flex>
        <FormInputDisplay
          title="name"
          defaultValue={result.name}
          onChange={(value) => {
            setResult({
              ...result,
              name: value,
            });
          }}
        />
      </Flex>
      <Separator size="4" />
      <EditAppServiceProviders
        defaultProviders={configuredProviders}
        parentId={result.id}
      />
      <AppButtonGroup
        actions={{
          save: () => {
            onSubmit(result);
          },
          cancel: () => {
            onSubmit(undefined);
          },
        }}
      />
    </Flex>
  );
};
