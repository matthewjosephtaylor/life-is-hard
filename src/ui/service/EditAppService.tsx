import { Button, Container, Flex } from "@radix-ui/themes";
import type { AppService } from "ai-worker-common";
import { AppObjects } from "ai-worker-common";
import { produce } from "immer";
import { useState } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { FormSelect } from "../form/FormSelect";
import { closeAppPopup } from "../popup/closeAppPopup";
import { FormFields } from "../user/FormFields";
import { openEditAppServiceProvider } from "./openEditAppServiceProvider";
import { isUndefined } from "@mjtdev/engine";
import { AppButtonGroup } from "../common/AppButtonGroup";

export const EditAppService = ({
  defaultValue = { type: "unknown" },
}: {
  defaultValue: Partial<AppService>;
}) => {
  const serviceProviders = DataObjectStates.useChildDataObjects(
    defaultValue.id,
    "app-service-provider"
  );
  console.log("serviceProviders", serviceProviders);
  const serviceTypes: AppService["type"][] = [
    "extract",
    "imagegen",
    "textgen",
    "tts",
    "vector",
    "crawl",
    "db",
    "proxy",
    "unknown",
    "asr",
    "vector",
    "lipsync",
  ];
  // const

  const [result, setResult] = useState<Partial<AppService>>(
    produce(defaultValue, (r) => {})
  );

  return (
    <Container style={{ overflow: "auto", maxHeight: "80vh", width: "100%" }}>
      <Flex direction={"column"} align={"center"} gap="5">
        <Flex gap="2" align={"start"} direction={"column"}>
          <Flex gap="9" align={"center"}>
            <FormSelect
              defaultValue={result.type}
              onChange={(value) => {
                setResult(
                  produce(result, (r) => {
                    r.type = value as AppService["type"];
                  })
                );
              }}
              title={"type"}
              values={serviceTypes}
            />
            <AppButtonGroup
              colors={{ "Delete Service Provider": "red" }}
              actions={{
                "Delete Service Provider": () => {
                  serviceProviders.map((sp) =>
                    DataObjectStates.deleteDataObject(sp.id)
                  );
                },
                [`${
                  serviceProviders.length === 0 ? "Add" : "Edit"
                } Service Provider`]: async () => {
                  const update = await openEditAppServiceProvider(
                    serviceProviders[0] ??
                      AppObjects.create("app-service-provider", {
                        type: defaultValue.type,
                      })
                  );
                  if (isUndefined(update)) {
                    return;
                  }
                  return DataObjectStates.upsertDataObject({
                    objectType: "app-service-provider",
                    draft: update,
                    parentId: defaultValue.id,
                  });
                },
              }}
            />
          </Flex>
          <FormFields
            keys={
              [
                "host",
                "domain",
                "enabled",
                "count",
              ] satisfies (keyof AppService)[]
            }
            defaultValue={defaultValue}
            readonlyKeys={["id"]}
            formFieldTypeMap={{ enabled: "boolean", count: "number" }}
            onChange={(key, value) => {
              setResult(
                produce(result, (r) => {
                  /** @ts-ignore */
                  r[key] = value;
                })
              );
            }}
          />
        </Flex>
        <Button
          onClick={() => {
            DataObjectStates.upsertDataObject({
              objectType: "app-service",
              draft: result,
            });
            closeAppPopup();
          }}
        >
          Save
        </Button>
      </Flex>
    </Container>
  );
};
