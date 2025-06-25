import {
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";

const Accordions = ({ header, children, update, setUpdate, currentUser }) => {
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

          {currentUser && (
            <div
              className="hover:bg-white/20 p-2 rounded-full"
              onClick={onClickHandler}
            >
              <EditIcon sx={{ color: "white" }} />
            </div>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails
        className={clsx(
          "!rounded-sm !p-[2rem] text-gray-500",
          update && "text-black"
        )}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordions;
