/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Typography,
  BoxProps,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import type { TSchema } from "@sinclair/typebox";

export const SchemaForm = ({
  schema,
  data = {},
  onValueChange = () => {},
  ...rest
}: BoxProps & {
  schema: TSchema;
  data?: any;
  onValueChange?: (field: string, value: any) => void;
}) => {
  const handleArrayChange = (key: string, index: number, value: any) => {
    const newArray = [...(data[key] || [])];
    newArray[index] = value;
    onValueChange(key, newArray);
  };

  const addItemToArray = (key: string) => {
    const newArray = [...(data[key] || []), ""];
    onValueChange(key, newArray);
  };

  const removeItemFromArray = (key: string, index: number) => {
    const newArray = [...(data[key] || [])];
    newArray.splice(index, 1);
    onValueChange(key, newArray);
  };

  const renderField = (key: string, property: any, value: any = "") => {
    switch (property?.type) {
      case "string":
        console.log(`string: '${key}'`, value);
        if (Array.isArray(property.enum) && property.enum.length > 0) {
          return (
            <FormControl fullWidth variant="outlined" key={key}>
              <InputLabel shrink={true}>
                {property.description || key}
              </InputLabel>
              <Select
                value={value || ""}
                onChange={(e) => onValueChange(key, e.target.value)}
                label={property.description || key}
              >
                {property.enum.map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }
        return (
          <TextField
            fullWidth
            key={key}
            label={property.description || key}
            variant="outlined"
            defaultValue={value || ""}
            onChange={(e) => onValueChange(key, e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        );
      case "number":
        return (
          <TextField
            fullWidth
            key={key}
            label={property.description || key}
            variant="outlined"
            type="number"
            defaultValue={value || ""}
            onChange={(e) => onValueChange(key, parseFloat(e.target.value))}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        );
      case "object":
        // Handle patternProperties for 'entityDescriptions'
        if (property.patternProperties) {
          return (
            <Box key={key}>
              <Typography>{property.description || key}</Typography>
              {Object.entries(value || {}).map(([patternKey, patternValue]) => (
                <TextField
                  fullWidth
                  key={patternKey}
                  label={patternKey}
                  variant="outlined"
                  defaultValue={patternValue || ""}
                  onChange={(e) =>
                    onValueChange(`${key}.${patternKey}`, e.target.value)
                  }
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              ))}
              <Button
                onClick={() =>
                  onValueChange(key, {
                    ...value,
                    [`newKey`]: "",
                  })
                }
                variant="outlined"
              >
                Add New Entry
              </Button>
            </Box>
          );
        }
        return (
          <Box key={key}>
            {Object.entries(property.properties || {}).map(
              ([subKey, subProperty]) =>
                renderField(
                  `${key}.${subKey}`,
                  subProperty,
                  value ? value[subKey] : ""
                )
            )}
          </Box>
        );
      case "array":
        return (
          <Box key={key} marginBottom={2}>
            <Typography>{property.description || key}</Typography>
            <Box display="flex" flexWrap="wrap" alignItems="center">
              {(value || []).map((item: any, index: number) => (
                <Box
                  display="flex"
                  alignItems="center"
                  key={`${key}-${index}`}
                  marginRight={1}
                  marginBottom={1}
                >
                  {renderField(`${key}[${index}]`, property.items, item)}
                  <IconButton
                    onClick={() => removeItemFromArray(key, index)}
                    color="secondary"
                  >
                    <Remove />
                  </IconButton>
                </Box>
              ))}
              <Button
                onClick={() => addItemToArray(key)}
                variant="outlined"
                startIcon={<Add />}
              >
                Add
              </Button>
            </Box>
          </Box>
        );
      default:
        // Handle 'anyOf'
        if (Array.isArray(property.anyOf)) {
          const options = property.anyOf.map((opt: any) => opt.const);
          return (
            <FormControl fullWidth variant="outlined" key={key}>
              <InputLabel shrink={true}>
                {property.description || key}
              </InputLabel>
              <Select
                value={value || ""}
                onChange={(e) => onValueChange(key, e.target.value)}
                label={property.description || key}
              >
                {options.map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }
        return null;
    }
  };

  return (
    <Box {...rest}>
      {Object.entries(schema?.properties || {}).map(([key, property]) =>
        renderField(key, property, data ? data[key] : undefined)
      )}
    </Box>
  );
};
