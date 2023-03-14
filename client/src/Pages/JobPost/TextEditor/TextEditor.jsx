import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const TextEditor = ({ title, setValue, defaultValue }) => {
  const placeholder = "Write your description...";
  const { quill, quillRef } = useQuill({ placeholder });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(defaultValue);
      quill.on("text-change", () => {
        setValue((prev) => ({
          ...prev,
          description: quillRef.current.firstChild.innerHTML,
        }));
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, quill, quillRef]);

  return (
    <div className="py-5">
      <h1 className="text-xl pb-4">{title && title}</h1>
      <div className="mb-24 sm:mb-12">
        <div style={{ width: "100%", height: 200 }}>
          <div ref={quillRef} />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
