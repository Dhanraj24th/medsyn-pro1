import React, { useRef } from "react";
import DocumentEditor from "@txtextcontrol/tx-react-document-editor";

export default function Editor() {
  const txRef = useRef(null);

  function handleLoad() {
    txRef.current = window.TXTextControl;
    console.log("Editor loaded:", txRef.current);

    window.TXTextControl.addEventListener("textControlLoaded", () => {
      console.log("✅ TX editor initialized");
    });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!txRef.current) {
      console.error("TXTextControl not ready");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(",")[1];
      const ext = file.name.split(".").pop().toLowerCase();

      let streamType = txRef.current.streamType.WordprocessingML || txRef.current.streamType.MSWord;
      if (ext === "html" || ext === "htm") streamType = txRef.current.streamType.HTMLFormat;
      else if (ext === "rtf") streamType = txRef.current.streamType.RichTextFormat;

      txRef.current.loadDocument(streamType, base64);
      console.log("📄 loadDocument called");
    };
    reader.readAsDataURL(file);
  }

  // 🔥 easiest replacement: get all text, replace placeholders, set it back
  function replacePlaceholders() {
    const tx = txRef.current;
    if (!tx) return console.error("TX not ready");

    tx.getText((text) => {
      console.log("Original text length:", text.length);

      let replaced = text;
      replaced = replaced.replaceAll("{{NAME}}", "John Doe");
      replaced = replaced.replaceAll("{{DATE}}", new Date().toLocaleDateString());
      replaced = replaced.replaceAll("{{ORDERID}}", "ORD-99999");

      tx.setText(replaced);
      console.log("✅ placeholders replaced");
    });
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <input type="file" onChange={handleFileChange} accept=".docx,.rtf,.html" />
        <button onClick={replacePlaceholders} style={{ marginLeft: 8 }}>
          🔄 Replace Placeholders
        </button>
      </div>
      <div style={{ width: "100%", height: "80vh" }}>
        <DocumentEditor
          style={{ width: "100%", height: "100%" }}
          webSocketURL="ws://localhost:8080/TXWebSocket"
          editMode="Edit"
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
}
