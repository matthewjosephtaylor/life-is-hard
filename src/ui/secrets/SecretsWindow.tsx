import { Objects, isUndefined } from "@mjtdev/engine";
import { Button, Flex, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { useUserState } from "../../state/user/UserState";
import { FormSelect } from "../form/FormSelect";
import { SecretsEditor } from "./SecretsEditor";

export const SecretsWindow = () => {
  const { id: userId } = useUserState();
  return <SecretsEditor subjectId={userId} />;
};

export const CharacterSecretsEditor = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { id: userId } = useUserState();
  const userSecretStores = DataObjectStates.useChildDataObjects(
    userId,
    "app-secret-store"
  );

  const [selectedCopyFrom, setSelectedCopyFrom] = useState<
    string | undefined
  >();

  return (
    <Flex direction="column" gap="2">
      <Separator size="4" />

      <Flex gap="2" align={"center"}>
        <FormSelect
          title={"Copy Secrets From"}
          defaultValue={selectedCopyFrom}
          values={Objects.fromEntries(
            userSecretStores.map((s) => [s.id, s.name ?? s.id])
          )}
          onChange={(id) => {
            setSelectedCopyFrom(id);
          }}
        />
        <Button
          onClick={() => {
            const copyFromSecretStore = userSecretStores.find(
              (s) => s.id === selectedCopyFrom
            );
            if (isUndefined(copyFromSecretStore)) {
              return;
            }
            DataObjectStates.upsertDataObject({
              objectType: "app-secret-store",
              draft: Objects.omit(copyFromSecretStore, "id"),
              parentId: characterId,
            });
          }}
        >
          Copy
        </Button>
      </Flex>
      <Separator size="4" />
      <SecretsEditor subjectId={characterId} />
    </Flex>
  );
};
