import {
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Accordions = ({ header, children, update, setUpdate }) => {
  const onClickHandler = (event) => {
    // this will prevent the accordion to not be closed by clicking hte icon.
    event.stopPropagation();
    setUpdate(!update);
  };

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary className="!bg-black/70 !text-white !rounded-sm">
        <div className="flex items-center justify-between !w-full">
          <h1>{header}</h1>

          <IconButton onClick={onClickHandler}>
            <EditIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
      </AccordionSummary>
      <AccordionDetails
        className={`!rounded-sm !p-[2rem] ${
          update ? "text-black" : "text-gray-500"
        } `}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordions;
