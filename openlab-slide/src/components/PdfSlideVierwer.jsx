import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

export default function PdfSlideViewer() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Document
        file="/slides/test.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        loading="PDFを読み込み中..."
        error="PDFの読み込みに失敗しました。"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={800}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}