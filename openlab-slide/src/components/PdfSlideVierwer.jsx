import { useMemo } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function PdfSlideViewer({ fileUrl = "/slides/sample.pdf" }) {
  const documents = useMemo(
    () => [
      {
        uri: fileUrl,
      },
    ],
    [fileUrl]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <DocViewer documents={documents} 
        pluginRenderers={DocViewerRenderers}
        config={{
          header: {
            disableHeader: true,
            disableFileName: true,
          },
          pdfZoom: {
            defaultZoom: 1.0,
            zoomJump: 0.2,
          },
          
  
        
        }}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#9fffbf",
        }}
        theme={{
      primary: "#0057b7",
      secondary: "#ffffff",
      tertiary: "#dbafff",
      textPrimary: "#00ff88",
      textSecondary: "#555",
      textTertiary: "#777777",
      disableThemeScrollbar: false,
      }}
      />
    </div>
  );
}
