import React from "react";
import { Button } from "@mui/material";
import Input from "../AddJobPost/utils/Input";

const EditCompany = () => {
  return (
    <form className="size shadowCard2 my-[2rem] p-8 lg:p-14 flex flex-col gap-3">
      <h1 className="text-2xl pb-6 text-center">Edit Your Profile</h1>

      <div className="flex gap-[2rem]">
        <Input
          type="text"
          label="company name"
          size="medium"
          onCHange=""
          name=""
          state=""
          isError=""
        />
        <Input
          type="text"
          label="company name"
          size="medium"
          onCHange=""
          name=""
          state=""
          isError=""
        />
      </div>
      <div className="flex gap-[2rem]">
        <Input
          type="text"
          label="company name"
          size="medium"
          onCHange=""
          name=""
          state=""
          isError=""
        />
        <Input
          type="text"
          label="company name"
          size="medium"
          onCHange=""
          name=""
          state=""
          isError=""
        />
      </div>
      <div className="flex gap-[2rem]">
        <Input
          type="text"
          label="company name"
          size="medium"
          onCHange=""
          name=""
          state=""
          isError=""
        />
        <Input
          type="text"
          label="company name"
          size="medium"
          onCHange=""
          name=""
          state=""
          isError=""
        />
      </div>
      <div className="flex gap-[2rem]">
        <Input
          type="text"
          label="company name"
          size="medium"
          onCHange=""
          name=""
          state=""
          isError=""
        />
        <Input
          type="text"
          label="company name"
          size="medium"
          onCHange=""
          name=""
          state=""
          isError=""
        />
      </div>
      <div className="flex gap-[2rem]">
        <Input
          type="text"
          label="company name"
          size="medium"
          onCHange=""
          name=""
          state=""
          isError=""
        />
        <Input
          type="text"
          label="company name"
          size="medium"
          onCHange=""
          name=""
          state=""
          isError=""
        />
      </div>
      <Input
        type="text"
        label="company name"
        size="medium"
        onCHange=""
        name=""
        state=""
        isError=""
      />
      <Input
        type="text"
        label="company name"
        size="medium"
        onCHange=""
        name=""
        state=""
        isError=""
      />
      <Input
        type="text"
        label="company name"
        size="medium"
        onCHange=""
        name=""
        state=""
        isError=""
      />
      <Input
        type="text"
        label="company name"
        size="medium"
        onCHange=""
        name=""
        state=""
        isError=""
      />
      <div className="pt-1">
        <p className="pb-2 text-sm text-gray-500">Choose Your Profile Image</p>
        <input type="file" />
      </div>

      <div className="text-right">
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EditCompany;
