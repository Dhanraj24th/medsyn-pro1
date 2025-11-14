import React, { useEffect, useRef, useState } from "react";

const Collabora = () => {
  const iframeRef = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [status, setStatus] = useState("Initializing...");

  // Config: Replace with your WOPI endpoint and token (from your app's auth)
  const documentInfo = {
    wopiSrc: "https://host.docker.internal:8001/wopi/files/1234", // Your WOPI URL
    token: "secret", // Your access token
  };

  // Encode WOPISrc for URL safety (critical for WS upgrade)
  const encodedWopiSrc = encodeURIComponent(documentInfo.wopiSrc);
  // Direct loader URL: Modern method (no form POST needed)
  const loaderUrl = `https://localhost:9980/browser/dist/cool.html?WOPISrc=${encodedWopiSrc}&access_token=${documentInfo.token}`;

  // postMessage listener (from repo example, updated for Host_PostmessageReady)
  useEffect(() => {
    const handleMessage = (event) => {
      // Basic origin check (enhance for prod: match your COOL domain)
      if (event.origin !== "http://localhost:9980") return;

      let data = event.data;
      try {
        if (typeof data === "string") data = JSON.parse(data);
      } catch (e) {
        console.warn("Invalid postMessage:", event.data);
        return;
      }

      console.log("📩 From COOL:", data);

      // Editor ready (repo uses PostmessageReady; modern: Host_PostmessageReady)
      if (data?.MessageId === "Host_PostmessageReady" || data?.MessageId === "PostmessageReady") {
        setStatus("Editor loaded!");
        setIsEditorReady(true);
      }

      // Response handler (e.g., for UNO command echoes)
      if (data?.MessageId?.endsWith("_Resp")) {
        console.log("↩️ COOL Response:", data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Send postMessage to iframe (repo pattern)
  const sendToIframe = (msg) => {
    if (!iframeRef.current) return;
    try {
      iframeRef.current.contentWindow.postMessage(JSON.stringify(msg), "http://localhost:9980");
      console.log("📤 Sent to COOL:", msg);
    } catch (err) {
      console.error("postMessage failed:", err);
    }
  };

  // UNO Command helpers (from repo: InsertText, InsertBookmark)
  const sendUnoCommand = (command, args = {}) => {
    if (!isEditorReady) {
      alert("Editor not ready!");
      return;
    }
    sendToIframe({
      MessageId: "UnoCommand", // Modern SDK syntax
      SendTime: Date.now(),
      Values: {
        Command: command,
        ...args, // e.g., { Text: { type: "string", value: "Hi" } }
      },
    });
  };

  const insertBookmark = () => {
    sendUnoCommand(".uno:InsertBookmark", {
      Bookmark: { type: "string", value: "ReactBookmark" },
    });
  };

  const insertText = () => {
    const text = document.getElementById("textInput")?.value.trim();
    if (!text) return alert("Enter text!");
    sendUnoCommand(".uno:InsertText", {
      Text: { type: "string", value: text },
    });
  };

  // Optional: Fetch WOPI CheckFileInfo for prod loader URL (enhances repo example)
  useEffect(() => {
    const initEditor = async () => {
      try {
        setStatus("Fetching doc info...");
        // Uncomment for real WOPI integration
        // const response = await fetch(`${documentInfo.wopiSrc}?access_token=${documentInfo.token}`);
        // const info = await response.json();
        // const dynamicLoader = info.url_src; // e.g., full /cool/.../ws URL
        setStatus("Loading editor...");
      } catch (err) {
        setStatus(`Error: ${err.message}`);
      }
    };
    initEditor();
  }, []);

  return (
    <div style={styles.container}>
      <h2>📝 Collabora Online SDK — React Example</h2>
      <p style={styles.note}>
        Based on <a href="https://github.com/CollaboraOnline/collabora-online-sdk-examples/tree/master/webapp/reactjs" target="_blank">official SDK repo</a>.
      </p>

      {/* Status (from repo) */}
      <div style={{ ...styles.status, background: isEditorReady ? "#d4edda" : "#f8d7da" }}>
        <strong>Status:</strong> {status} {isEditorReady ? "✅" : "⏳"}
      </div>

      {/* Controls (from repo) */}
      <div style={styles.controls}>
        <button onClick={insertBookmark} disabled={!isEditorReady} style={styles.button("#007bff")}>
          Insert Bookmark
        </button>
        <input
          id="textInput"
          placeholder="Enter text to insert..."
          style={styles.input}
          disabled={!isEditorReady}
        />
        <button onClick={insertText} disabled={!isEditorReady} style={styles.button("#28a745")}>
          Insert Text
        </button>
      </div>

      {/* Iframe (from repo: targeted name, but direct src now) */}
      <iframe
        ref={iframeRef}
        name="collaboraFrame" // For legacy form targeting
        src={loaderUrl}
        style={styles.iframe}
        onLoad={() => setStatus("Iframe loaded, waiting for ready...")}
        title="Collabora Editor"
        allow="clipboard-read; clipboard-write"
      />

      {/* Debug note */}
      <p style={styles.note}>🔍 Check console for postMessage logs.</p>
    </div>
  );
};

// Styles (inline for simplicity; use CSS modules in full app)
const styles = {
  container: { padding: 20, fontFamily: "Arial, sans-serif", maxWidth: "1200px" },
  note: { fontSize: 14, color: "#666", margin: "10px 0" },
  status: {
    padding: 10,
    borderRadius: 4,
    border: "1px solid #ccc",
    marginBottom: 20,
    background: "#f8f9fa",
  },
  controls: { marginBottom: 20 },
  button: (bg) => ({
    padding: "8px 16px",
    background: bg,
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    marginRight: 10,
    disabled: { opacity: 0.6, cursor: "not-allowed" },
  }),
  input: { padding: 8, width: 200, marginRight: 10, borderRadius: 4, border: "1px solid #ccc" },
  iframe: { width: "100%", height: 600, border: "1px solid #ddd", borderRadius: 4 },
};

export default Collabora;