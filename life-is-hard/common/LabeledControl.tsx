import React, { ReactNode } from "react";
import { Box, FormControl, InputLabel } from "@mui/material";

interface LabeledControlProps {
  label?: string;
  children: ReactNode;
}

export function LabeledControl({ label, children }: LabeledControlProps) {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{ mt: "1em", position: "relative", width: "fit-content" }}
    >
      {label && (
        <InputLabel
          shrink
          sx={{
            position: "absolute",
            top: "-0.6em", // Position the label above the box
            left: "0.75em", // Align label with padding
            zIndex: 1, // Ensure label is above the border
            px: 0.5, // Padding around the label
            backgroundColor: "transparent", // Keep background transparent
            pointerEvents: "none", // Disable interaction on the label
          }}
        >
          {label}
        </InputLabel>
      )}
      <Box
        sx={{
          border: "1px solid", // Use theme-aware border color
          borderColor: "grey.500", // Use grey color from the theme
          borderRadius: "0.25em", // Rounded corners
          padding: "1.5em 1em 1em 1em", // Ensure space for label
        }}
      >
        {children}
      </Box>
    </FormControl>
  );
}
