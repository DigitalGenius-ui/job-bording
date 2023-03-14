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
import React from "react";
import TextEditor from "./TextEditor/TextEditor";
import Input from "./utils/Input";

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

  return (
    <div>
      <h1 className="text-center text-2xl py-8">Position Details</h1>

      <Input
        label="Job Title"
        type="text"
        text=" Example: “Senior Designer”. Titles must describe one position."
        name="job_title"
        onCHange={handleChange}
        defaultValue={aboutPosition.job_title}
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
            <MenuItem value={"Design"}>Design</MenuItem>
            <MenuItem value={"Front-End Development"}>
              Front-End Development
            </MenuItem>
            <MenuItem value={"Back-End Development"}>
              Back-End Development
            </MenuItem>
            <MenuItem value={"Full-Stack Development"}>
              Full-Stack Development
            </MenuItem>
            <MenuItem value={"DevOps"}>DevOps</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
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
          {aboutPosition.position_accross_globe === "Yes" && (
            <>
              <Input
                label="Country"
                type="text"
                name="country"
                defaultValue={aboutPosition?.country}
                onCHange={handleChange}
              />
              <Input
                label="State"
                type="text"
                name="state"
                defaultValue={aboutPosition?.state}
                onCHange={handleChange}
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
          defaultValue={aboutPosition?.application_link_or_email}
        />
      </div>

      <TextEditor
        title="Job Description"
        name="description"
        setValue={setAboutPosition}
        onChange={handleChange}
        defaultValue={aboutPosition?.description}
      />
    </div>
  );
};

export default Position;
