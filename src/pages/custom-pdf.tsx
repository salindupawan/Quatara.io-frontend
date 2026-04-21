import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Worker configuration
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface ScrollablePdfViewerProps {
  file: File | string | null;
  pageWidth?: number;
  onPageClick?: (pageNumber: number, containerRef: React.RefObject<HTMLDivElement>) => void;
  onLoadSuccess?: (numPages: number) => void;
  activePageNumber?: number;
}

const ScrollablePdfViewer = ({ 
  file, 
  pageWidth = 700, 
  onPageClick, 
  onLoadSuccess,
  activePageNumber 
}: ScrollablePdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    if (onLoadSuccess) onLoadSuccess(numPages);
  };

  return (
    <div className="w-full max-w-4xl h-[80vh] overflow-y-auto custom-scrollbar bg-slate-200 border-2 rounded-2xl p-4 shadow-inner">
      {!file ? (
        <div className="h-full flex items-center justify-center text-slate-500 font-medium italic">
          No document uploaded.
        </div>
      ) : (
        <Document
          file={file}
          onLoadSuccess={handleLoadSuccess}
          className="flex flex-col gap-8 items-center"
          loading={
            <div className="flex flex-col items-center gap-2 p-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
              <p className="text-sm text-slate-500">Loading PDF...</p>
            </div>
          }
        >
          {Array.from(new Array(numPages), (_, index) => {
            const pageNum = index + 1;
            const isSelected = activePageNumber === pageNum;

            return (
              <div
                key={`page_${pageNum}`}
                className={`relative shadow-2xl bg-white transition-all duration-300 ring-offset-4 
                  ${isSelected ? 'ring-4 ring-sky-500 scale-[1.01] z-10' : 'hover:scale-[1.005]'}`}
                onClick={() => onPageClick?.(pageNum, { current: null } as any)}
              >
                {/* Page Label */}
                <div className="absolute -left-12 top-0 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-md">
                  P. {pageNum}
                </div>

                <Page
                  pageNumber={pageNum}
                  width={pageWidth}
                  renderTextLayer={true}
                  renderAnnotationLayer={false}
                  devicePixelRatio={Math.min(2, window.devicePixelRatio)}
                  loading={<div style={{ width: pageWidth, height: pageWidth * 1.4 }} className="bg-white animate-pulse" />}
                />
              </div>
            );
          })}
        </Document>
      )}
    </div>
  );
};

export default ScrollablePdfViewer;