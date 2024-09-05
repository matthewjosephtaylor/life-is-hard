import { Objects } from "@mjtdev/engine";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { produce } from "immer";
import { useState } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { FormInputDisplay } from "../form/FormInputDisplay";
import { closeAppPopup } from "../popup/closeAppPopup";
import { MultipleChoiceDisplay } from "./MultipleChoiceDisplay";

type CreateAppUser = {
  userName: string;
  password: string;
  groups: string[];
};
export const CreateAppUserPopup = ({
  onSubmit,
}: {
  onSubmit: (value: CreateAppUser) => void;
}) => {
  const searchParams = new URLSearchParams(window.location.search);
  const [result, setResult] = useState<CreateAppUser>(
    produce(
      {
        userName: "",
        password: "",
        groups: [],
      },
      () => {}
    )
  );

  const groups = DataObjectStates.useDataObjectsByType("app-group");

  const submit = async () => {
    onSubmit(result);
    closeAppPopup();
  };

  return (
    <Flex align={"center"} direction={"column"} gap="4">
      <FormInputDisplay
        autoFocus={true}
        title="userName"
        defaultValue={result.userName}
        onChange={(value) => {
          setResult(
            produce(result, (r) => {
              r.userName = value;
            })
          );
        }}
      />
      <FormInputDisplay
        type="password"
        title="password"
        onKeyUp={(evt) => {
          if (evt.key === "Enter") {
            submit();
          }
        }}
        defaultValue=""
        onChange={(value) => {
          setResult(
            produce(result, (r) => {
              r.password = value;
            })
          );
        }}
      />
      <Card>
        <Flex direction={"column"} gap="1">
          <Text as="label" size="2" mb="1" weight="bold">
            Groups
          </Text>
          <MultipleChoiceDisplay
            defaultValue={[]}
            possibleValues={groups.map((g) => g.id)}
            names={Objects.fromEntries(
              groups.map((g) => [g.id, g.name ?? g.id])
            )}
            onChange={(groupIds) => {
              setResult(
                produce(result, (r) => {
                  r.groups = groupIds;
                })
              );
            }}
          />
        </Flex>
      </Card>

      <Flex>
        <Button
          onClick={() => {
            submit();
          }}
        >
          Create User
        </Button>
      </Flex>
    </Flex>
  );
};

