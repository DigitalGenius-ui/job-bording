import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import TextEditor from "../../../AddJobPost/TextEditor/TextEditor";

const Benefits = ({ data, setData }) => {
  const placeholder = "Write your description...";
  const { quill, quillRef } = useQuill({ placeholder });

  useEffect(() => {
    if (quill) {
      // give initialValue to the text editor
      quill.clipboard.dangerouslyPasteHTML(data.benefits);
      quill.on("text-change", () => {
        setData((prev) => ({
          ...prev,
          benefits: quillRef.current.firstChild.innerHTML,
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, quillRef]);
  return <TextEditor title="Benefits" quillRef={quillRef} />;
};

const FinalStep = ({ data, setData }) => {
  // text editor
  const placeholder = "Write your description...";
  const { quill, quillRef } = useQuill({ placeholder });

  useEffect(() => {
    if (quill) {
      // give initialValue to the text editor
      quill.clipboard.dangerouslyPasteHTML(data.hiring);
      quill.on("text-change", () => {
        setData((prev) => ({
          ...prev,
          hiring: quillRef.current.firstChild.innerHTML,
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, quillRef]);

  return (
    <div>
      <Benefits data={data} setData={setData} />
      <TextEditor title="Hiring" quillRef={quillRef} />
    </div>
  );
};

export default FinalStep;
