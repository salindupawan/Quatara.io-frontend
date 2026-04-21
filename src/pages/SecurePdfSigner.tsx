/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import SignaturePad from "react-signature-canvas";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const SignatureComponent = (SignaturePad as any).default || SignaturePad;

interface PDFViewerProps {
  fileUrl: string;
  x: number;
  y: number;
  page: number;
}

const PDFViewer = ({ fileUrl, x, y, page }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signatureURL, setSignatureURL] = useState<string | null>(null);

  const sigCanvas = useRef<any>(null);

  /**
   * FIX: Create a ref for the Draggable element
   * to avoid the findDOMNode error.
   */
  //   const draggableRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const saveSignature = () => {
    if (sigCanvas.current) {
      const canvas = sigCanvas.current.getCanvas();
      if (canvas) {
        setSignatureURL(canvas.toDataURL("image/png"));
        setIsModalOpen(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div
        className="relative shadow-lg border bg-white mb-4"
        style={{ width: "600px" }}
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="p-10 text-center">Loading PDF...</div>}
        >
          <Page
            pageNumber={pageNumber}
            width={800}
            devicePixelRatio={Math.min(2, window.devicePixelRatio)}
            renderTextLayer={true}
            renderMode="canvas"
            renderAnnotationLayer={true}
                  loading={<div style={{ width: 800, height: 800 * 1.4 }} className="bg-white animate-pulse" />}
          />
        </Document>

        {/* 2. Render signature ONLY if it matches the current page */}
        {x && page === pageNumber && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: `${y}px`,
              left: `${x}px`,
              transform: "translate(-50%, -50%)", // Center the signature on the click point
            }}
          >
            {signatureURL && fileUrl && (
              <img src={signatureURL} alt="signature" className="w-32" />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center gap-6">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => p - 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:bg-gray-300"
          >
            Prev
          </button>
          <span className="font-bold">
            {pageNumber} / {numPages}
          </span>
          <button
            disabled={pageNumber >= (numPages || 0)}
            onClick={() => setPageNumber((p) => p + 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
        >
          Sign Document
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Draw Signature</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 overflow-hidden">
              <SignatureComponent
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ className: "w-full h-64 cursor-crosshair" }}
              />
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => sigCanvas.current?.clear()}
                className="px-5 py-2 text-red-500"
              >
                Clear
              </button>
              <button
                onClick={saveSignature}
                className="px-8 py-2 bg-blue-600 text-white rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
