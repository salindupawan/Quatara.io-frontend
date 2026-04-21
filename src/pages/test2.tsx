import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface SignaturePosition {
  x: number;
  y: number;
  page: number;
}

const Test = () => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  
  // This is the programmatically calculated signature position based on drag
  const [signaturePosition, setSignaturePosition] = useState<SignaturePosition | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  
  // Ref for the Draggable element (to fix findDOMNode crash)
  // const tagRef = useRef<HTMLDivElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const addSignaturePosition = () => {
    // Start the signature position in the top-left of the current page
    setSignaturePosition({ x: 20, y: 20, page: pageNumber });
  };

  // 1. Programmatically calculate final coordinates based on drag event
  // const handleDragStop = (e: any, data: any) => {
  //   if (!pageContainerRef.current) return;
  //   const rect = pageContainerRef.current.getBoundingClientRect();

  //   /**
  //    * Data.x/y is relative to the Draggable container, not the viewport.
  //    * We need to add that relative move (data.x) to the viewport's position.
  //    * BUT data.y gives us where the Mouse event ended. We use that directly.
  //    * * IMPORTANT: Coordinates must be programmatically derived from where the tag ends.
  //    */
  //   setSignaturePosition({
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top,
  //     page: pageNumber
  //   });
  // };

  const submitMetadata = () => {
    if (!signaturePosition) return;
    console.log("Submitting programmatic metadata to backend:", {
      file: file?.name,
      ...signaturePosition // coordinates x, y, and page
    });
  };

  // const changePage = (offset: number) => {
  //   setPageNumber(prev => Math.max(1, Math.min(numPages, prev + offset)));
  // };

  return (
    <div className="flex flex-col items-center p-6 bg-slate-100 min-h-screen font-sans">
      {/* File Upload / Actions Header */}
      <div className="w-full max-w-5xl bg-white p-4 rounded-2xl shadow-sm border mb-6 flex justify-between items-center">
        <div className="flex gap-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-slate-100 text-slate-800 rounded-lg font-medium hover:bg-slate-200 transition"
          >
            {file ? `Change: ${file.name.substring(0, 15)}...` : 'Upload PDF'}
          </button>
          <input type="file" ref={fileInputRef} onChange={onFileChange} accept=".pdf" className="hidden" />
          
          {file && (
            <button 
              onClick={addSignaturePosition}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg font-medium flex gap-2 items-center hover:bg-sky-700 transition"
            >
              <svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16"><path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 8 8.22 4.28a.75.75 0 0 1 0-1.06Z"></path><path fill-rule="evenodd" d="M1 8a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 8Z"></path></svg>
              Add Signature position
            </button>
          )}
        </div>

        {signaturePosition && (
          <button 
            onClick={submitMetadata}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
          >
            Submit metadata to backend
          </button>
        )}
      </div>

      {/* Main View Area (scrollable page stack) */}
      <div className="w-full max-w-3xl h-[80vh] overflow-y-auto custom-scrollbar bg-slate-200 border-2 rounded-2xl p-4">
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className="flex flex-col gap-6 items-center"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div 
              key={`page_${index + 1}`} 
              ref={index + 1 === pageNumber ? pageContainerRef : undefined}
              className="relative shadow-xl bg-white group select-none"
              onClick={() => setPageNumber(index + 1)} // Set active page on click
            >
              <Page 
                pageNumber={index + 1} 
                width={700} 
                renderTextLayer={true}
                renderAnnotationLayer={false}
              />
              
              
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default Test;