import { motion, type Target } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export const Pulse = ({
  style,
  pulseStyle,
  children,
  pulseKey,
}: {
  pulseKey?: string | number;
  children?: ReactNode;
  style: CSSProperties;
  pulseStyle: CSSProperties;
}) => {
  // const pulseStyle = {
  //   ...style,
  //   backgroundColor: "white",
  //   color: "black",
  // };
  return (
    <motion.div
      key={pulseKey}
      initial={pulseStyle as Target}
      animate={{
        backgroundColor: [pulseStyle.backgroundColor, style.backgroundColor],
        color: [pulseStyle.color, style.color],
      }}
      transition={{ duration: 3 }}
    >
      {children}
    </motion.div>
  );
};
