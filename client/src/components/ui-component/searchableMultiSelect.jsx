import { Autocomplete, TextField } from "@mui/material";

function SearchableMultiSelect({
  label,
  hint,
  name,
  options,
  value,
  onChange,
  error,
  className = "",
  placeholder = "Search and select",
}) {
  return (
    <div className={`common-searchable-multi-select ${className}`} data-hint={hint}>
      <Autocomplete
        multiple
        id={name}
        options={options}
        value={value}
        onChange={(_, nextValue) => onChange(nextValue)}
        disableCloseOnSelect
        size="small"
        className="common-searchable-input"
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={value.length ? "Add another" : placeholder}
            error={Boolean(error)}
            helperText={error}
          />
        )}
      />
    </div>
  );
}

export default SearchableMultiSelect;
