import { isDefined } from "@mjtdev/engine";
import { Button, Card, Flex, Separator, Text } from "@radix-ui/themes";
import type { AppServiceProvider } from "ai-worker-common";
import { APP_SERVICE_TYPES, AppObjects } from "ai-worker-common";
import { formatAndCapitalize } from "../../common/formatAndCapitalize";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppButtonGroup } from "../common/AppButtonGroup";
import { openEditAppServiceProvider } from "../service/openEditAppServiceProvider";

export const EditAppServiceProviders = ({
  defaultProviders,
  parentId,
}: {
  parentId: string;
  defaultProviders: Readonly<AppServiceProvider[]>;
}) => {
  const existingProviderTypes = defaultProviders
    .map((p) => p.type)
    .filter(isDefined);

  const missingProviders = APP_SERVICE_TYPES.filter(
    (type) => !existingProviderTypes.includes(type)
  );

  const addMissingButtons = missingProviders.map((type, i) => (
    <Button
      onClick={async () => {
        const updated = await openEditAppServiceProvider(
          AppObjects.create("app-service-provider", { type })
        );
        if (!updated || !updated.id) {
          return;
        }
        DataObjectStates.upsertDataObject({
          objectType: "app-service-provider",
          draft: updated,
        });
        DataObjectStates.upsertDataLink({
          objectType: "app-service-provider",
          childId: updated.id,
          parentId,
          key: "",
        });
      }}
      key={i}
    >
      Add {formatAndCapitalize(type)}
    </Button>
  ));

  const configuredProvidersDisplays = [...defaultProviders]
    .sort((a, b) => {
      return (a?.type ?? "").localeCompare(b?.type ?? "");
    })
    .map((serviceProvider, i) => {
      if (!serviceProvider) {
        return;
      }

      const serviceType = serviceProvider.type;
      if (!serviceType) {
        return <>No Service Type for: {serviceProvider.id}</>;
      }
      return (
        <Card key={i}>
          <Flex align={"center"} gap="2">
            <Text>{formatAndCapitalize(serviceType)} Service</Text>

            <AppButtonGroup
              colors={{ delete: "red" }}
              actions={{
                delete: async () => {
                  await DataObjectStates.deleteDataLink({
                    parentId,
                    childId: serviceProvider.id,
                    objectType: "app-service-provider",
                  });
                  await DataObjectStates.deleteDataObject(serviceProvider.id);
                },
                edit: async () => {
                  const updated = await openEditAppServiceProvider(
                    serviceProvider
                  );
                  if (!updated) {
                    return;
                  }
                  DataObjectStates.upsertDataObject({
                    objectType: "app-service-provider",
                    draft: updated,
                  });
                },
              }}
            />
          </Flex>
        </Card>
      );
    })
    .filter(isDefined);

  return (
    <Flex align={"center"} gap="5">
      <Text>Services</Text>
      <Flex gap="2" wrap="wrap">
        {addMissingButtons}
      </Flex>
      <Separator orientation="vertical" style={{ height: "9em" }} />
      <Flex wrap={"wrap"} gap="2" align={"center"}>
        {configuredProvidersDisplays}
      </Flex>
    </Flex>
  );
};
