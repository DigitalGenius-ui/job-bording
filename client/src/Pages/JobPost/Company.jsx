import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import { JobContext } from "../../Context/Context";
import TextEditor from "./TextEditor/TextEditor";
import Input from "./utils/Input";

const Company = ({ aboutCompany, setAboutCompany, validate }) => {
  const { setAlert } = JobContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutCompany((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (validate) {
      setAlert({
        type: "error",
        message: "This Field is required",
        open: true,
      });
      return;
    }
  }, [validate, setAlert]);

  return (
    <div>
      <h1 className="text-center text-2xl py-8">About the company</h1>

      <div className="mb-4">
        <FormControl>
          <FormLabel>Job Posted Before?</FormLabel>
          <RadioGroup
            row
            defaultValue={aboutCompany?.job_posted_before}
            name="job_posted_before"
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText>
            No If 'Yes' just enter your email, other details will be filled
            automatically
          </FormHelperText>
        </FormControl>
      </div>

      {aboutCompany.job_posted_before === "Yes" && (
        <Input
          type="email"
          label="Email Id"
          name="email_id"
          defaultValue={aboutCompany?.email_id}
          onCHange={handleChange}
        />
      )}

      <div className="flex items-center gap-4 my-6">
        <Input
          type="text"
          label="Company Name"
          text="Enter your company or organization’s name"
          name="company_name"
          defaultValue={aboutCompany?.company_name}
          onCHange={handleChange}
        />
        <Input
          type="text"
          label="Company Headquarters"
          text="Where your company is officially headquartered."
          name="company_hq"
          onCHange={handleChange}
          defaultValue={aboutCompany?.company_hq}
        />
      </div>

      <Input
        type="text"
        label="Company Mission and Vision"
        text="Enter your company or organization’s mission statement. 
        This will be displayed on your company’s profile."
        name="company_mission_vission"
        onCHange={handleChange}
        defaultValue={aboutCompany?.company_mission_vission}
      />

      <div className="my-6">
        <Input
          type="text"
          label="Company Website"
          text="Example: https://example.com/"
          name="company_website"
          onCHange={handleChange}
          defaultValue={aboutCompany?.company_website}
        />
      </div>

      <TextEditor
        title="Company Description"
        name={"description"}
        onChange={handleChange}
        setValue={setAboutCompany}
        defaultValue={aboutCompany?.description}
      />
    </div>
  );
};

export default Company;
