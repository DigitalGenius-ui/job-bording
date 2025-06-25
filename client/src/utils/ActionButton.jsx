import { CircularProgress } from "@mui/material";

const ActionButton = ({ btnText, isPending, ...props }) => {
  return (
    <button {...props}>{isPending ? <CircularProgress /> : btnText}</button>
  );
};

export default ActionButton;
