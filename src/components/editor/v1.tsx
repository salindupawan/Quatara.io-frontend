/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react';
import { Viewer, Worker,type RenderPageProps } from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { DndContext,type DragEndEvent, useSensor, PointerSensor } from '@dnd-kit/core';
import { PageOverlay } from './PageOverlay';
import { 
  Upload, Save, Signature, Calendar, FileText, 
  ChevronLeft, ChevronRight, Hash 
} from 'lucide-react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

export default function PdfSigner() {
  const [file, setFile] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [targetPageInput, setTargetPageInput] = useState(1);

  // Plugins
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;

  const sensors = [useSensor(PointerSensor, { activationConstraint: { distance: 5 } })];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile?.type === 'application/pdf') {
      setFile(URL.createObjectURL(uploadedFile));
      setAnnotations([]);
      setCurrentPage(0);
    }
  };

  const addAnnotation = (type: 'signature' | 'date') => {
    const pageIdx = targetPageInput - 1; // Human 1-based to JS 0-based
    
    // Safety check for page bounds
    if (pageIdx < 0 || pageIdx >= numPages) {
      alert(`Invalid page. Document has ${numPages} pages.`);
      return;
    }

    setAnnotations([...annotations, {
      id: `${type}-${Date.now()}`,
      type,
      pageIndex: pageIdx,
      x: 100,
      y: 100,
    }]);

    // Automatically navigate to that page so they can move it
    if (pageIdx !== currentPage) {
      jumpToPage(pageIdx);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    
    setAnnotations((prev) => prev.map((anno) => {
      if (anno.id === active.id) {
        return {
          ...anno,
          x: anno.x + delta.x,
          y: anno.y + delta.y,
        };
      }
      return anno;
    }));
  };

  

  const renderPage = useCallback(
    (props: RenderPageProps) => (
      <>
        {props.canvasLayer.children}
        {props.textLayer.children}
        {props.annotationLayer.children}
        <PageOverlay 
          pageIndex={props.pageIndex} 
          annotations={annotations} 
          onDelete={(id: string) => setAnnotations(annotations.filter(a => a.id !== id))}
        />
      </>
    ),
    [annotations]
  );

  

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col p-6 shrink-0 z-[1001]">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <FileText size={20} />
          </div>
          <span className="font-bold text-xl text-slate-800">Quatara Sign</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step 1: Upload</label>
            <label className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-xl cursor-pointer hover:bg-slate-800 transition-all">
              <Upload size={18} />
              <span className="font-medium">Choose PDF</span>
              <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
            </label>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step 2: Configuration</label>
            
            <div className="flex flex-col gap-2">
              <span className="text-sm text-slate-600 flex items-center gap-2">
                <Hash size={14} /> Target Page Number:
              </span>
              <input 
                type="number" 
                min="1" 
                max={numPages || 1}
                value={targetPageInput}
                onChange={(e) => setTargetPageInput(parseInt(e.target.value) || 1)}
                className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => addAnnotation('signature')}
                disabled={!file}
                className="flex flex-col items-center gap-2 p-4 border border-slate-100 rounded-xl hover:border-indigo-600 transition-all disabled:opacity-30"
              >
                <Signature className="text-indigo-600" />
                <span className="text-xs font-semibold">Signature</span>
              </button>
              <button 
                onClick={() => addAnnotation('date')}
                disabled={!file}
                className="flex flex-col items-center gap-2 p-4 border border-slate-100 rounded-xl hover:border-indigo-600 transition-all disabled:opacity-30"
              >
                <Calendar className="text-indigo-600" />
                <span className="text-xs font-semibold">Date</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <button 
            onClick={() => console.log("Exported Coordinates:", annotations)}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            <Save size={18} /> Complete & Save
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Pagination Toolbar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-center gap-8 shrink-0">
          <button 
            disabled={currentPage === 0}
            onClick={() => jumpToPage(currentPage - 1)}
            className="p-2 hover:bg-slate-100 rounded-full disabled:opacity-20"
          >
            <ChevronLeft />
          </button>
          
          <span className="font-medium text-slate-700">
            Page <span className="text-indigo-600">{currentPage + 1}</span> of {numPages || '?'}
          </span>

          <button 
            disabled={currentPage === numPages - 1}
            onClick={() => jumpToPage(currentPage + 1)}
            className="p-2 hover:bg-slate-100 rounded-full disabled:opacity-20"
          >
            <ChevronRight />
          </button>
        </div>

        {/* PDF Viewport */}
        <div className="flex-1 overflow-auto p-12 bg-slate-100 flex justify-center">
          <div className="w-full max-w-4xl h-fit">
            {file ? (
              <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <div className="shadow-2xl bg-white">
                    <Viewer 
                      fileUrl={file} 
                      renderPage={renderPage}
                      plugins={[pageNavigationPluginInstance]}
                      onPageChange={(e) => setCurrentPage(e.currentPage)}
                      onDocumentLoad={(e) => setNumPages(e.doc.numPages)}
                    />
                  </div>
                </Worker>
              </DndContext>
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-3xl text-slate-400">
                <FileText size={48} className="mb-4 opacity-20" />
                <p>Upload a PDF to begin the signing process</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}