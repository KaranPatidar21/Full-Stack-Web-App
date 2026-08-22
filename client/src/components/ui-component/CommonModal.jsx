import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function CommonModal({
  open,
  onClose,
  title,
  description,
  titleId,
  descriptionId,
  secondaryActionLabel = "Cancel",
  primaryActionLabel = "Confirm",
  onSecondaryAction,
  onPrimaryAction,
  primaryActionClassName = "",
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={descriptionId}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSecondaryAction || onClose}>
          {secondaryActionLabel}
        </Button>
        <Button
          onClick={onPrimaryAction}
          variant="contained"
          className={primaryActionClassName}
        >
          {primaryActionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommonModal;
