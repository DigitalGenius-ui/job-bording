import React from "react";
import "quill/dist/quill.snow.css";

const TextEditor = ({ title, quillRef }) => {
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
