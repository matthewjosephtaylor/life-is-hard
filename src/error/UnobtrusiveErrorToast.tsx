import { Button, Flex } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { openAppPopup } from "../ui/popup/openAppPopup";
import { ErrorPopup } from "./ErrorPopup";

export const UnobtrusiveErrorToast = ({
  error,
  label = "Oops! Click for details",
  onEnd = () => {},
}: {
  label?: string;
  error: unknown;
  onEnd: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 10 }}
      onAnimationComplete={() => onEnd()}
    >
      <Flex>
        <Button
          onClick={() => {
            openAppPopup(<ErrorPopup error={error} />);
            onEnd();
          }}
          color="orange"
        >
          {label}
        </Button>
      </Flex>
    </motion.div>
  );
};
