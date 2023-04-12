import {
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { JobContext } from "../../../Context/Context";

const Accordions = ({ header, children }) => {
  const { setUpdate } = JobContext();
  const onClickHandler = (event) => {
    event.stopPropagation();
    setUpdate(prev => !prev);
  };

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="!bg-black/70 !text-white !rounded-sm">
        <div className="flex items-center justify-between !w-full">
          <h1>{header}</h1>

          <IconButton onClick={onClickHandler}>
            <EditIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
      </AccordionSummary>
      <AccordionDetails className="!rounded-sm !p-[2rem]">
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordions;
