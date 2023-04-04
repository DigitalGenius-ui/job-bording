import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import TextEditor from "../../../AddJobPost/TextEditor/TextEditor";

const StepOne = ({ data, setData }) => {
  // text editor
  const placeholder = "Write your description...";
  const { quill, quillRef } = useQuill({ placeholder });

  const handleChange = (e) => {
    setData((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (quill) {
      // give initialValue to the text editor
      quill.clipboard.dangerouslyPasteHTML(data.about);
      quill.on("text-change", () => {
        setData((prev) => ({
          ...prev,
          about: quillRef.current.firstChild.innerHTML,
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, quillRef]);

  return (
    <div className="mt-[2rem]">
      <div className="flex flex-col md:flex-row gap-5 my-3">
        <div className="flex-1">
          <TextField
            label="Company Name"
            fullWidth
            name="company_name"
            defaultValue={data.company_name}
            onChange={handleChange}
          />
          <FormHelperText>Your Company Name</FormHelperText>
        </div>
        <div className="flex-1">
          <TextField
            label="HQ"
            fullWidth
            name="HQ"
            onChange={handleChange}
            defaultValue={data.HQ}
          />
          <FormHelperText>Company current address</FormHelperText>
        </div>
      </div>

      <div className="flex gap-5 my-3 flex-col md:flex-row">
        <div className="flex-1">
          <TextField
            label="Established"
            fullWidth
            name="established"
            defaultValue={data.established}
            onChange={handleChange}
          />
          <FormHelperText>Year of Establishment</FormHelperText>
        </div>
        <div className="flex-1 mb-2">
          <TextField
            label="Industry"
            fullWidth
            name="industry"
            defaultValue={data.industry}
            onChange={handleChange}
          />
          <FormHelperText>Company mission</FormHelperText>
        </div>
      </div>

      <FormControl fullWidth>
        <InputLabel>Company Size</InputLabel>
        <Select
          label="Company Size"
          value={data.size}
          onChange={(e) => setData({ ...data, size: e.target.value })}
        >
          <MenuItem value="1 - 5">1 - 5</MenuItem>
          <MenuItem value="5 - 10">5 - 10</MenuItem>
          <MenuItem value="10 - 20">10 - 20</MenuItem>
          <MenuItem value="20+">20+</MenuItem>
        </Select>
        <FormHelperText>Company Seats</FormHelperText>
      </FormControl>

      <TextEditor title="More About Your Company" quillRef={quillRef} />
    </div>
  );
};

export default StepOne;
