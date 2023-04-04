import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import TextEditor from "../../../AddJobPost/TextEditor/TextEditor";

const StepTow = ({ data, setData }) => {
  const handleChange = (e) => {
    setData((prev) => {
      const { name, value } = e.target;
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
      quill.clipboard.dangerouslyPasteHTML(data.culture);
      quill.on("text-change", () => {
        setData((prev) => ({
          ...prev,
          culture: quillRef.current.firstChild.innerHTML,
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, quillRef]);

  return (
    <div className="flex flex-col gap-5 mt-[2rem]">
      <div className="flex gap-5">
        <TextField
          fullWidth
          label="Company Website"
          name="website"
          defaultValue={data.website}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Company linkedIn"
          name="linkedIn"
          defaultValue={data.linkedIn}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-5">
        <TextField
          fullWidth
          label="Company twitter"
          name="twitter"
          defaultValue={data.twitter}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Company telegram"
          name="telegram"
          defaultValue={data.telegram}
          onChange={handleChange}
        />
      </div>

      <TextEditor title="Your Company Culture" quillRef={quillRef} />
    </div>
  );
};

export default StepTow;
