import { Button } from "@mui/material";

function PtJobButton({ buttons = [], className = "" }) {
  return (
    <div
      className={className}
      style={{ display: "inline-flex", gap: "8px", flexWrap: "wrap" }}
    >
      {buttons.map((button, index) => {
        const label = button.label ?? button.name ?? button.actionName;

        return (
          <Button
            key={button.id ?? `${label ?? "button"}-${index}`}
            variant={button.variant ?? "contained"}
            size={button.size ?? "small"}
            disableElevation
            component={button.component}
            to={button.to}
            onClick={button.onClick}
            disabled={button.disabled}
            className={button.className}
            sx={{
              textTransform: "none",
              minWidth: "auto",
              px: 1.5,
              py: 0.55,
              fontSize: "0.8125rem",
              fontWeight: 600,
              borderRadius: 1.5,
              boxShadow: "none",
              ...(button.sx || {}),
            }}
            {...button.props}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}

export default PtJobButton;