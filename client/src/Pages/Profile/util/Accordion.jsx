import {
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { JobContext } from "../../../Context/Context";

const Accordions = ({ header, children, update, setUpdate, currentUser }) => {
  const { user } = JobContext();

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

          {user?._id === currentUser?._id && (
            <IconButton onClick={onClickHandler}>
              <EditIcon sx={{ color: "white" }} />
            </IconButton>
          )}
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
