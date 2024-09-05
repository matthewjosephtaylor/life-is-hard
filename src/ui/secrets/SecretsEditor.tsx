import { Button, Container, Flex, Section } from "@radix-ui/themes";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { SecretStoresTable } from "./SecretStoresTable";


export const SecretsEditor = ({ subjectId }: { subjectId?: string; }) => {
  return (
    <Section>
      <Container>
        <Flex align={"center"} direction={"column"} gap="4">
          <Button
            color="green"
            onClick={() => {
              DataObjectStates.upsertDataObject({
                draft: {
                  name: "Secret Store",
                  records: {},
                },
                objectType: "app-secret-store",
                parentId: subjectId,
              });
            }}
          >
            Add Secret Store
          </Button>
          <SecretStoresTable subjectId={subjectId} />
        </Flex>
      </Container>
    </Section>
  );
};
