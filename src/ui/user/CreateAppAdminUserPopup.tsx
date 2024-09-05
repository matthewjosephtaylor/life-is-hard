import { createState } from "@mjtdev/engine";
import { Button, Flex, Strong } from "@radix-ui/themes";
import { FormInputDisplay } from "../form/FormInputDisplay";
import { closeAppPopup } from "../popup/closeAppPopup";
import { useState } from "react";
import { produce } from "immer";

type CreateAppAdminUser = {
  userName: string;
  password: string;
  accessToken: string;
};
export const CreateAppAdminUserPopup = ({
  onSubmit,
}: {
  onSubmit: (value: CreateAppAdminUser) => void;
}) => {
  const searchParams = new URLSearchParams(window.location.search);
  const [result, setResult] = useState<CreateAppAdminUser>(
    produce(
      {
        userName: "",
        password: "",
        accessToken: searchParams.get("access") ?? "",
      },
      () => {}
    )
  );
  const submit = async () => {
    // const { userName, password, accessToken } = getPopupState();
    // onSubmit(getPopupState());
    onSubmit(result);
    closeAppPopup();
  };

  // updatePopupState((state) => {
  //   state.accessToken = searchParams.get("access") ?? "";
  // });
  return (
    <Flex align={"center"} direction={"column"} gap="4">
      <Strong color="red">Create App Admin User</Strong>
      <FormInputDisplay
        autoFocus={true}
        title="access token"
        defaultValue={result.accessToken}
        onChange={(value) => {
          setResult(
            produce(result, (r) => {
              r.accessToken = value;
            })
          );
        }}
      />
      <FormInputDisplay
        autoFocus={true}
        title="User Name"
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
        title="Password"
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
