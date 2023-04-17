import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import TextEditor from "./TextEditor/TextEditor";
import Input from "./utils/Input";
import data from "../../app.config.json";

const Position = ({ aboutPosition, setAboutPosition, validate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutPosition((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // text editor
  const placeholder = "Write your description...";
  const { quill, quillRef } = useQuill({ placeholder });

  useEffect(() => {
    if (quill) {
      // give initialValue to the text editor
      quill.clipboard.dangerouslyPasteHTML(aboutPosition.job_description);
      quill.on("text-change", () => {
        setAboutPosition((prev) => ({
          ...prev,
          job_description: quillRef.current.firstChild.innerHTML,
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, quillRef, setAboutPosition]);

  return (
    <div>
      <h1 className="text-center text-2xl py-8">Position Details</h1>

      <Input
        label="Job Title"
        type="text"
        text=" Example: “Senior Designer”. Titles must describe one position."
        name="job_title"
        onCHange={handleChange}
        state={aboutPosition}
        isError={validate}
      />

      <div className="flex items-center gap-3 my-3">
        <FormControl fullWidth className="flex-1">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>

          <Select
            label="Category"
            onChange={(e) =>
              setAboutPosition({ ...aboutPosition, category: e.target.value })
            }
            value={aboutPosition.category}
          >
            {data.categories.map((cat, i) => (
              <MenuItem value={cat} key={i}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="flex-1">
          <FormLabel id="job_type">Job Type</FormLabel>
          <RadioGroup
            row
            defaultValue={aboutPosition?.job_type}
            value={aboutPosition.job_type}
            name="job_type"
            onChange={handleChange}
          >
            <FormControlLabel
              value="Full-Time"
              control={<Radio />}
              label="Full-Time"
            />
            <FormControlLabel
              value="Part-Time"
              control={<Radio />}
              label="Part-Time"
            />
            <FormControlLabel
              value="Contract"
              control={<Radio />}
              label="Contract"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <FormControl fullWidth className="flex-1">
        <InputLabel id="demo-simple-select-label">Salary Range</InputLabel>

        <Select
          label="Salary Range"
          onChange={(e) =>
            setAboutPosition({ ...aboutPosition, salary_range: e.target.value })
          }
          defaultValue={aboutPosition.salary_range}
          value={aboutPosition.salary_range}
        >
          <MenuItem value={"Prefer Not to Share"}>Prefer Not to Share</MenuItem>
          {data.salary.map((money, i) => (
            <MenuItem key={i} value={money}>
              {money}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="my-5">
        <FormControl className="flex-1">
          <FormLabel>Is this position opening across the globe?</FormLabel>
          <RadioGroup
            row
            defaultValue="No"
            name="position_accross_globe"
            onChange={handleChange}
          >
            <FormControlLabel value="No" control={<Radio />} label="No" />
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          </RadioGroup>
          <FormHelperText>
            'Yes' means, candidate can work from anywhere in the world
          </FormHelperText>
        </FormControl>
      </div>

      <div>
        <div className="flex items-center gap-6 mb-5">
          {aboutPosition.position_accross_globe === "No" && (
            <>
              <Input
                label="Country"
                type="text"
                name="country"
                state={aboutPosition}
                onCHange={handleChange}
                isError={validate}
              />
              <Input
                label="State"
                type="text"
                name="state"
                state={aboutPosition}
                onCHange={handleChange}
                isError={validate}
              />
            </>
          )}
        </div>

        <Input
          label="Application Link or Email"
          type="email"
          text="Link to Application page or Email address"
          name="application_link_or_email"
          onCHange={handleChange}
          state={aboutPosition}
          isError={validate}
        />
      </div>

      <div className="mt-6">
        <FormControl fullWidth className="flex-1">
          <InputLabel id="demo-simple-select-label">Keyword</InputLabel>

          <Select
            label="keyword"
            onChange={(e) =>
              setAboutPosition({
                ...aboutPosition,
                keyword: e.target.value,
              })
            }
            defaultValue={aboutPosition.keyword}
            value={aboutPosition.keyword}
          >
            {data.keyWords.map((trend, i) => (
              <MenuItem key={i} value={trend}>
                {trend}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TextEditor title="Job Description" quillRef={quillRef} />
    </div>
  );
};

export default Position;
