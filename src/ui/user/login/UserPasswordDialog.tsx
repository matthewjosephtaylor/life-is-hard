import { Button, Card, Container, Flex, Strong, Text } from "@radix-ui/themes";
import type { AppUser } from "ai-worker-common";
import { produce } from "immer";
import { useState } from "react";
import { userLogin } from "../../../backend/user/userLogin";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { useUserState } from "../../../state/user/UserState";
import { FormInputDisplay } from "../../form/FormInputDisplay";
import { closeAllAppPopups } from "../../popup/closeAllAppPopups";

export const UserPasswordDialog = () => {
  const { id: userId } = useUserState();
  const user = DataObjectStates.useDataObject<AppUser>(userId);

  const [state, setState] = useState(
    produce(
      {
        userName: user?.userName,
        password: "" as string | undefined,
      },
      () => {}
    )
  );
  const submit = async ({ userName, password }: typeof state) => {
    console.log("UserPasswordDialog submit", { userName, password });
    if (!userName || !password) {
      closeAllAppPopups();
      return;
    }
    await userLogin({ userName, password });
  };
  return (
    <Container>
      <Card>
        <Flex align={"center"} gap="4" direction={"column"}>
          <Strong>
            <Text size="1">Password Sign In</Text>
          </Strong>
          <FormInputDisplay
            title="Name"
            autoFocus={(user?.userName ?? "").trim() === ""}
            defaultValue={user?.userName}
            onChange={(value) => {
              setState(
                produce(state, (s) => {
                  s.userName = value;
                })
              );
            }}
          />
          <FormInputDisplay
            type="password"
            title="Password"
            autoFocus={(user?.userName ?? "").trim() !== ""}
            onKeyUp={(evt) => {
              if (evt.key === "Enter") {
                submit(state);
              }
            }}
            onChange={(value) => {
              setState(
                produce(state, (s) => {
                  s.password = value;
                })
              );
            }}
          />
          <Flex>
            <Button
              onClick={() => {
                submit(state);
              }}
            >
              Login
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
};
