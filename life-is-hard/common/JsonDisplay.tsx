/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, Chip } from "@mui/material";

interface JsonDisplayProps {
  data: any;
  indentLevel?: number;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ data, indentLevel = 0 }) => {
  const indentSize = 2; // Adjust the indent size to your preference

  const renderValue = (value: any, level: number): React.ReactNode => {
    switch (typeof value) {
      case "string":
        return (
          <Box
            component="span"
            sx={{
              display: "inline-block",
              padding: "4px 8px",
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: "16px",
              backgroundColor: "background.paper",
              color: "primary.main",
              whiteSpace: "normal", // Allow text to wrap
              wordBreak: "break-word", // Break long words
              // maxWidth: 150, // Adjust width as needed
              overflowWrap: "break-word", // Handle overflow
              // fontSize: "0.75rem", // Adjust font size to match Chip
            }}
          >
            {`${value}`}
          </Box>
        );
      // return (
      //   <Chip
      //     label={`"${value}"`}
      //     color="primary"
      //     variant="outlined"
      //     size="small"
      //     sx={{
      //       whiteSpace: "normal", // Allow line breaks
      //       wordBreak: "break-word", // Break long words
      //       maxWidth: 150, // Set a maximum width
      //       overflowWrap: "break-word", // Handle overflow
      //     }}
      //   />
      // );
      case "number":
        return (
          <Chip
            label={value}
            color="secondary"
            variant="outlined"
            size="small"
          />
        );
      case "boolean":
        return (
          <Chip
            label={value ? "true" : "false"}
            sx={{
              backgroundColor: value ? "success.main" : "error.main",
              color: "#fff",
            }}
            size="small"
          />
        );
      case "object":
        if (value === null) {
          return (
            <Chip
              label="null"
              sx={{ backgroundColor: "grey.500", color: "#fff" }}
              size="small"
            />
          );
        } else if (Array.isArray(value)) {
          return (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                ml: level * indentSize,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 1,
                bgcolor: "background.paper",
              }}
            >
              {value.map((item, index) => (
                <Box key={index} sx={{ mb: 0.5 }}>
                  {renderValue(item, level + 1)}
                </Box>
              ))}
            </Box>
          );
        } else {
          return (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                ml: level * indentSize,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 1,
                bgcolor: "background.paper", // Ensure background matches theme
              }}
            >
              {Object.entries(value).map(([key, val]) => (
                <Box
                  key={key}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    p: 1,
                    mb: 0.5,
                    minWidth: 100,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    position: "relative",
                    flex: "1 1 auto",
                    bgcolor: "background.paper", // Ensure background matches theme
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      color: "text.secondary",
                      lineHeight: 1,
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      px: 0.5,
                      bgcolor: "background.paper", // Match background to the paper theme
                    }}
                  >
                    {key}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mt: 1, // Margin to adjust below the label
                    }}
                  >
                    {renderValue(val, level + 1)}
                  </Box>
                </Box>
              ))}
            </Box>
          );
        }
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {renderValue(data, indentLevel)}
    </Box>
  );
};

export default JsonDisplay;
