import { openAppPopup } from "../../popup/openAppPopup";
import { PublicAccessPointsDialog } from "./PublicAccessPointsDialog";

export const openPublicAccessPointsDialog = ({
  characterId,
}: {
  characterId: string;
}) => {
  openAppPopup(<PublicAccessPointsDialog characterId={characterId} />);
};
