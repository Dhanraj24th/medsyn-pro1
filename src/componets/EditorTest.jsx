import React from "react";

export default function EditorTest() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>OnlyOffice Test</h2>
      <iframe
        src="https://docspace-hlkza1.onlyoffice.com"
        width="100%"
        height="600px"
        style={{ border: '1px solid #ccc' }}
        onLoad={() => console.log('✅ Iframe loaded')}
        onError={() => console.log('❌ Iframe error')}
      />
    </div>
  );
}