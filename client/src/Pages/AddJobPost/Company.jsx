import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import TextEditor from "./TextEditor/TextEditor";
import Input from "./utils/Input";
import { useQuill } from "react-quilljs";

const Company = ({ jobForm, setJobForm, validate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobForm((prev) => {
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
      quill.clipboard.dangerouslyPasteHTML(jobForm.company_description);
      quill.on("text-change", () => {
        setJobForm((prev) => ({
          ...prev,
          company_description: quillRef.current.firstChild.innerHTML,
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, quillRef, setJobForm]);

  return (
    <div>
      <h1 className="text-center text-2xl py-8">About the company</h1>

      <div className="mb-4">
        <FormControl>
          <FormLabel>Job Posted Before?</FormLabel>
          <RadioGroup
            row
            defaultValue={jobForm?.job_posted_before}
            value={jobForm.job_posted_before}
            name="job_posted_before"
            onChange={handleChange}>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText>
            No If 'Yes' just enter your email, other details will be filled
            automatically
          </FormHelperText>
        </FormControl>
      </div>

      {jobForm?.job_posted_before === "Yes" && (
        <Input
          type="email"
          label="Email Id"
          name="email_id"
          state={jobForm}
          onCHange={handleChange}
          isError={validate}
        />
      )}

      <div className="flex items-center gap-4 my-6">
        <Input
          type="text"
          label="Company Name"
          text="Enter your company or organization’s name"
          name="company_name"
          state={jobForm}
          onCHange={handleChange}
          isError={validate}
        />
        <Input
          type="text"
          label="Company Headquarters"
          text="Where your company is officially headquartered."
          name="company_hq"
          onCHange={handleChange}
          state={jobForm}
          isError={validate}
        />
      </div>

      <Input
        type="text"
        label="Company Mission and Vision"
        text="Enter your company or organization’s mission statement. 
        This will be displayed on your company’s profile."
        name="company_mission_vission"
        onCHange={handleChange}
        state={jobForm}
        isError={validate}
      />

      <div className="my-6">
        <Input
          type="text"
          label="Company Website"
          text="Example: https://example.com/"
          name="company_website"
          onCHange={handleChange}
          state={jobForm}
          isError={validate}
        />
      </div>

      <TextEditor title="Company Description" quillRef={quillRef} />
    </div>
  );
};

export default Company;
