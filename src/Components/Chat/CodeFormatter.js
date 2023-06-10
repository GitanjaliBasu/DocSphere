import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { FiCopy } from "react-icons/fi";

const CodeFormatter = ({ snippet }) => {
  const languageMatch = snippet.match(/^(\w+)\n/);
  const language = languageMatch ? languageMatch[1] : null;
  const cleanedSnippet = snippet.replace(/^\w+\n/, "");
  const highlightedSnippet = hljs.highlightAuto(
    cleanedSnippet,
    language ? [language] : null
  ).value;

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#f1f1f1",
        border: "1px solid #ccc",
        borderRadius: "3px",
        padding: "8px",
        marginBottom: "8px"
      }}
    >
      <pre
        style={{
          overflowX: "auto",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word"
        }}
        dangerouslySetInnerHTML={{ __html: highlightedSnippet }}
      ></pre>
      <FiCopy
        style={{
          cursor: "pointer",
          position: "absolute",
          right: "8px",
          top: "8px",
          color: "#0078d4",
          fontSize: "1.2rem"
        }}
        onClick={() => {
          navigator.clipboard.writeText(cleanedSnippet);
        }}
      />
    </div>
  );
};

export default CodeFormatter;
