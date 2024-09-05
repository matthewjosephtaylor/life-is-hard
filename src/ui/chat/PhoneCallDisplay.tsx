import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppBorder } from "../agent/AppBorder";

export const PhoneCallDisplay = ({ chatId }: { chatId: string }) => {
  const phoneCalls = DataObjectStates.useChildDataObjects(chatId, "phone-call");

  return (
    <AppBorder title="phone call">
      {phoneCalls.map((phoneCall, i) => (
        <pre key={i}>{JSON.stringify(phoneCall, undefined, 2)}</pre>
      ))}
    </AppBorder>
  );
};
