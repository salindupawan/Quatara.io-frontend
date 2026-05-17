/* eslint-disable @typescript-eslint/no-explicit-any */
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { pageNavigationPlugin,  } from '@react-pdf-viewer/page-navigation';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";

import '@react-pdf-viewer/core/lib/styles/index.css';
import { useState } from 'react';

interface SimplePDFViewerProps {
  fileUrl: string;
}

const SimplePDFViewer1 = ({ fileUrl }: SimplePDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Initialize the navigation plugin
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < numPages) {
      setCurrentPage(newPage);
      jumpToPage(newPage);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen gap-6">
      {/* 1. PDF Container - Forced Single Page View */}
      <div 
        className="relative shadow-2xl border bg-white overflow-hidden"
        style={{ width: "800px", height: "1132px" }} // Standard A4 Aspect Ratio
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            initialPage={currentPage}
            plugins={[pageNavigationPluginInstance]}
            onDocumentLoad={(e) => setNumPages(e.doc.numPages)}
          />
        </Worker>
      </div>

      {/* 2. Professional Control Panel */}
      <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200">
        <div className="flex items-center justify-between w-full px-2">
          <Button
            variant="outline"
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
            className="rounded-xl h-10 w-24 font-bold"
          >
            <ChevronLeft size={18} className="mr-1" /> Prev
          </Button>

          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-black mb-1">
              Page
            </span>
            <span className="text-lg font-black text-slate-800">
              {currentPage + 1} <span className="text-slate-300 mx-1">/</span> {numPages}
            </span>
          </div>

          <Button
            variant="outline"
            disabled={currentPage >= numPages - 1}
            onClick={() => handlePageChange(currentPage + 1)}
            className="rounded-xl h-10 w-24 font-bold"
          >
            Next <ChevronRight size={18} className="ml-1" />
          </Button>
        </div>

        <div className="w-full h-px bg-slate-100 my-2" />

        <div className="flex items-center gap-2 text-slate-500">
          <FileText size={16} />
          <span className="text-xs font-medium italic truncate max-w-[200px]">
            {fileUrl.split('/').pop()}
          </span>
        </div>
      </div>

      {/* 3. Global CSS Override to kill the internal scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .rpv-core__viewer {
          overflow: hidden !important;
        }
        .rpv-core__inner-pages {
          display: block !important;
        }
      `}} />
    </div>
  );
};

export default SimplePDFViewer1;