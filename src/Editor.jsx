import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";

const initialValue = `<h2>Kualifikasi</h2><ul><li>Memahami React JS</li><li>Memahami OOP</li><li>Mengerti CSS</li></ul><p><img src="https://cdn.pixabay.com/photo/2022/06/27/18/55/grain-7288138_960_720.jpg" alt="foto body" width="310" height="207"><br></p><h2>Requirement</h2><ul><li>Minimal S1 Sistem Informasi</li><li>Bersedia bekerja</li></ul>`;

const Editor = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(initialValue);

  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      placeholder: placeholder || "Start typings...",
    };
  }, [placeholder]);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
      <div style={{ marginTop: 10 }}>
        <h1>Output</h1>
        <div dangerouslySetInnerHTML={createMarkup(content)}></div>
      </div>
    </>
  );
};

export default Editor;
