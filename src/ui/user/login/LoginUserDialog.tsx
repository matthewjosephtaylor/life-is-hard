import { Button, Container, Flex, Separator } from "@radix-ui/themes";
import { closeAppPopup } from "../../popup/closeAppPopup";
import { openAppPopup } from "../../popup/openAppPopup";
import { UserPasswordDialog } from "./UserPasswordDialog";
import { useEffect } from "react";
import { useAppState } from "../../../state/app/AppState";
import { AppMessages } from "ai-worker-common";
import { AppMessagesState } from "../../../state/ws/AppMessagesState";

export const LoginUserDialog = () => {
  const googleSignInElementId = "google-sign-in";
  const { gisClientId } = useAppState();
  useEffect(() => {
    if (!gisClientId) {
      return;
    }
    google.accounts.id.initialize({
      client_id: gisClientId,
      callback: (credential) => {
        console.log(credential);
        AppMessagesState.dispatch({
          type: "auth",
          detail: {
            gisCredential: credential.credential,
          },
        });
      },
    });
    google.accounts.id.renderButton(
      document.getElementById(googleSignInElementId)!,
      {
        theme: "filled_blue",
        size: "medium",
        type: "standard",
      }
    );
  }, [gisClientId]);
  return (
    <Container m={"2"}>
      <Flex align={"center"} direction="column" gap="4">
        <div id={googleSignInElementId} />
        <Separator size="4" />

        <Button
          onClick={() => {
            console.log("LoginUserDialog click sign password");
            closeAppPopup();
            return openAppPopup(<UserPasswordDialog />, {
              style: { width: "fit-content", height: "fit-content" },
            });
          }}
        >
          Sign in with Password
        </Button>
      </Flex>
    </Container>
  );
};
