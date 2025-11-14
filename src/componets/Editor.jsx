import React, { useEffect, useState, useRef } from "react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";

export default function App() {
  const [config, setConfig] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch("http://localhost:3001/config");
        const data = await res.json();
          console.log(data);

        // Attach events into config
        data.config.events = {
          onDocumentReady: () => {
            const documentEditor =
              window.DocEditor.instances["docEditor"]; // global ref
            editorRef.current = documentEditor;

            console.log("✅ Document Ready, editor:", documentEditor);

            // Show message
            documentEditor.showMessage("Welcome to ONLYOFFICE Editor!");

            // Example ComboBox content control
            // documentEditor.serviceCommand("InsertAndReplaceContentControl", [
            //   {
            //     Tag: "Department",
            //     Id: "combo-01",
            //     Type: "ComboBox",
            //     Items: [
            //       { DisplayText: "Engineering", Value: "eng" },
            //       { DisplayText: "Sales", Value: "sales" },
            //       { DisplayText: "HR", Value: "hr" },
            //     ],
            //     SelectedValue: "sales",
            //   },
            // ]);
          },
        };

        setConfig(data.config);
      } catch (err) {
        console.error("❌ Error fetching config:", err);
      }
    }

    fetchConfig();
  }, []);

  // Function to insert filler text at cursor
const insertFiller = (filler) => {
  if (editorRef.current) {
    console.log("Inserting filler:", editorRef);

    // 1. Create a connector to the editor
    const connector = editorRef.current.createConnector(); // Available method

    // 2. Use callCommand to execute Text Document API methods
    connector.callCommand(function() {
      var oDocument = Api.GetDocument();
      var oParagraph = Api.CreateParagraph();
      oParagraph.AddText(`{{${filler}}}`);
      oDocument.InsertContent([oParagraph]); // Inserts at the current cursor position
    }, function() {
      console.log("Filler inserted successfully!");
    });
  }
};

  if (!config) {
    return <div>Loading editor...</div>;
  }

  return (
    <div>
      <div style={{ height: "600px" }}>
        <DocumentEditor
          id={"docEditor"}
          documentServerUrl="http://localhost:80/" // your Document Server
          config={config}
          events_onDocumentReady={() =>
            console.log("📄 Document loaded event fired")
          }
          onLoadComponentError={(err) =>
            console.error("❌ Editor error:", err)
          }
        />
      </div>

      {/* Dropdown of fillers */}
      <div style={{ marginTop: "1rem" }}>
        <select onChange={(e) => insertFiller(e.target.value)}>
          <option value="">Insert filler...</option>
          <option value="student">Student</option>
          <option value="subject">Subject</option>
          <option value="marks">Marks</option>
        </select>
      </div>
    </div>
  );
}
