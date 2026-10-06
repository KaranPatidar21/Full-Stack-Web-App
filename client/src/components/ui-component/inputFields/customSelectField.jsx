import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function CustomSelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  className = "",
  placeholder,
  ...props
}) {
  const emptyLabel = placeholder || `Select ${label.toLowerCase()}`;

  return (
    <FormControl
      fullWidth
      size="small"
      error={Boolean(error)}
      className={className}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        {...props}
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
      >
        <MenuItem value="" disabled>{emptyLabel}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export default CustomSelectField;
