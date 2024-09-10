import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps,
} from "@mui/material";

interface DropdownListProps<T>
  extends Omit<SelectProps<T>, "onChange" | "value"> {
  values: readonly T[] | Readonly<Record<string, T>>;
  label?: string;
  selectedValue?: T;
  onChange?: (value: T) => void;
}

export function DropdownList<T extends string>({
  values,
  label,
  selectedValue,
  onChange,
  ...rest
}: DropdownListProps<T>) {
  const renderMenuItems = () => {
    if (Array.isArray(values)) {
      return values.map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      ));
    } else {
      return Object.entries(values).map(([key, value]) => (
        <MenuItem key={key} value={value}>
          {key}
        </MenuItem>
      ));
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedValue}
        onChange={(event) => {
          onChange?.(event.target.value as T);
        }}
        label={label}
        {...rest}
      >
        {renderMenuItems()}
      </Select>
    </FormControl>
  );
}
