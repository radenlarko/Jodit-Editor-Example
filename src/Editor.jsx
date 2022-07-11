import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";

const initialValue = `<h2>Kualifikasi</h2><ul><li>Memahami React JS</li><li>Memahami OOP</li><li>Mengerti CSS</li></ul><p><img src="https://cdn.pixabay.com/photo/2022/06/27/18/55/grain-7288138_960_720.jpg" alt="foto body" width="310" height="207"><br></p><h2>Requirement</h2><ul><li>Minimal S1 Sistem Informasi</li><li>Bersedia bekerja</li></ul>`;

const Editor = ({ placeholder }) => {
  const editor1 = useRef(null);
  const editor2 = useRef(null);
  const [content1, setContent1] = useState(initialValue);
  const [content2, setContent2] = useState("");

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
    <div style={{ padding: 10, maxWidth: 1024, marginInline: "auto" }}>
      <h1>Editor 1</h1>
      <JoditEditor
        ref={editor1}
        value={content1}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent1(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
      <h1>Editor 2</h1>
      <JoditEditor
        ref={editor2}
        value={content2}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent2(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
      <hr />
      <div style={{ marginTop: 10, display: "flex", flexDirection: "row" }}>
        <div style={{width: "100%", paddingRight: 10}}>
          <h1>Output1</h1>
          <div dangerouslySetInnerHTML={createMarkup(content1)}></div>
        </div>
        <div style={{width: "100%", paddingLeft: 10}}>
          <h1>Output2</h1>
          <div dangerouslySetInnerHTML={createMarkup(content2)}></div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
