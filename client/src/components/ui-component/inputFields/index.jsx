import { TextField } from "@mui/material";

function CustomInputField({
  label,
  fullWidth = true,
  variant = "outlined",
  size = "small",
  className = "",
  sx,
  ...props
}) {
  return (
    <TextField
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      label={label}
      className={className}
      sx={[
        {
          "& .MuiInputBase-root": {
            borderRadius: "12px",
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.95rem",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#ff6236",
          },
          "& .MuiInputBase-input": {
            fontSize: "0.95rem",
          },
        },
        sx,
      ]}
      {...props}
    />
  );
}

export default CustomInputField;
