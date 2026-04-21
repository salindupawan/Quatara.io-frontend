/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, type MouseEvent } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import SignaturePad from 'react-signature-canvas';

// Worker setup
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const SignatureComponent = (SignaturePad as any).default || SignaturePad;

interface SignaturePosition {
  url: string;
  x: number;
  y: number;
  page: number;
}

const PdfTest = () => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signature, setSignature] = useState<SignaturePosition | null>(null);
  const [tempData, setTempData] = useState<{ x: number; y: number; page: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const sigCanvas = useRef<any>(null);

  // Handle File Upload
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  // Capture Click Coordinates on a specific page
  const handlePageClick = (e: MouseEvent, pageIndex: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTempData({ x, y, page: pageIndex });
    setIsModalOpen(true);
  };

  const saveSignature = () => {
    if (sigCanvas.current && tempData) {
      const canvas = sigCanvas.current.getCanvas();
      setSignature({
        url: canvas.toDataURL('image/png'),
        ...tempData
      });
      setIsModalOpen(false);
    }
  };

  const handleFinalUpload = () => {
    if (!signature) return alert("Please add a signature first");
    console.log("Uploading PDF with Signature Metadata:", {
      fileName: file?.name,
      signaturePosition: signature
    });
    // Here you would typically send 'file' and 'signature' to your backend
  };

  return (
    <div className="flex flex-col items-center p-6 bg-slate-50 min-h-screen font-sans">
      {/* Header / Upload */}
      <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-sm mb-6 flex justify-between items-center border">
        <div className="flex gap-3">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {file ? 'Change PDF' : 'Upload PDF'}
          </button>
          <input type="file" ref={fileInputRef} onChange={onFileChange} accept=".pdf" className="hidden" />
        </div>

        {signature && (
          <button 
            onClick={handleFinalUpload}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 animate-pulse"
          >
            Submit Signed Document
          </button>
        )}
      </div>

      {!file && (
        <div className="mt-20 text-gray-400 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-dashed border-gray-300 rounded-full mb-4" />
          <p>Upload a PDF to start signing</p>
        </div>
      )}

      {/* Scrollable PDF Container */}
      {file && (
        <div className="w-full max-w-3xl h-[80vh] overflow-y-auto border-2 border-gray-200 rounded-xl bg-gray-200 p-4 custom-scrollbar">
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="flex flex-col gap-4 items-center"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div 
                key={`page_${index + 1}`} 
                className="relative shadow-md bg-white cursor-crosshair group"
                onClick={(e) => handlePageClick(e, index + 1)}
              >
                <Page 
                  pageNumber={index + 1} 
                  width={650} 
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
                
                {/* Page Number Label */}
                <div className="absolute top-2 right-2 bg-black/20 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition">
                  Page {index + 1}
                </div>

                {/* Render Signature if it belongs to this page */}
                {signature && signature.page === index + 1 && (
                  <div 
                    className="absolute pointer-events-none"
                    style={{ 
                      top: `${signature.y}px`, 
                      left: `${signature.x}px`,
                      transform: 'translate(-50%, -50%)' 
                    }}
                  >
                    <img src={signature.url} alt="sign" className="w-24 border border-blue-400/50" />
                  </div>
                )}
              </div>
            ))}
          </Document>
        </div>
      )}

      {/* Signature Pad Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold mb-1">Place Signature</h3>
            <p className="text-sm text-gray-500 mb-4">Page {tempData?.page} at position {Math.round(tempData?.x || 0)}, {Math.round(tempData?.y || 0)}</p>
            
            <div className="border-2 border-gray-100 rounded-xl bg-slate-50">
              <SignatureComponent 
                ref={sigCanvas} 
                canvasProps={{ className: "w-full h-48" }} 
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-500 font-medium hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={() => sigCanvas.current?.clear()}
                className="px-4 py-2 text-red-500 font-medium hover:bg-red-50 rounded-lg"
              >
                Clear
              </button>
              <button 
                onClick={saveSignature}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-200 transition"
              >
                Apply Signature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfTest;