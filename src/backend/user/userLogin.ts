import { AppMessagesState } from "../../state/ws/AppMessagesState";
export const userLogin = async ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) => {
  console.log("dispatching auth");
  AppMessagesState.dispatch({
    type: "auth",
    detail: {
      userName,
      password,
    },
  });
};
