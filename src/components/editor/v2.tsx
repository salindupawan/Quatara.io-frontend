/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react';
import { Viewer, Worker, type RenderPageProps } from '@react-pdf-viewer/core';
import { DndContext,type DragEndEvent, useSensor, PointerSensor, MouseSensor } from '@dnd-kit/core';
import { PageOverlay } from './PageOverlay';
import { Upload, Save, FileText } from 'lucide-react';

import '@react-pdf-viewer/core/lib/styles/index.css';

export default function PdfSigner() {
  const [file, setFile] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<any[]>([]);

  // Sensor configuration to prevent interference with scrolling
  const sensors = [
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(MouseSensor)
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile?.type === 'application/pdf') {
      setFile(URL.createObjectURL(uploadedFile));
      setAnnotations([]); // Reset on new file
    }
  };

  const addAnnotation = (type: 'signature' | 'date') => {
    const newAnno = {
      id: `${type}-${Date.now()}`,
      type,
      pageIndex: 1,
      x: 50,
      y: 50,
    };
    setAnnotations((prev) => [...prev, newAnno]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;

    if (over && over.id.toString().startsWith('page-')) {
      const targetPage = over.data.current?.pageIndex;
      
      setAnnotations((prev) => 
        prev.map((anno) => {
          if (anno.id === active.id) {
            return {
              ...anno,
              x: anno.x + delta.x,
              y: anno.y + delta.y,
              pageIndex: targetPage,
            };
          }
          return anno;
        })
      );
    }
  };

  const deleteAnnotation = (id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
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
          onDelete={deleteAnnotation}
        />
      </>
    ),
    [annotations]
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Navbar */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FileText className="text-indigo-600" />
            <span className="font-bold text-slate-800">Quatara PDF</span>
          </div>
          <div className="flex gap-2">
            <label className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer hover:bg-slate-800">
              <Upload size={14} /> Upload PDF
              <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
            </label>
            <button 
              onClick={() => addAnnotation('signature')} 
              disabled={!file}
              className="bg-white border px-3 py-1.5 rounded-md text-sm hover:border-indigo-600 disabled:opacity-50"
            >
              Add Signature
            </button>
            <button 
              onClick={() => addAnnotation('date')} 
              disabled={!file}
              className="bg-white border px-3 py-1.5 rounded-md text-sm hover:border-indigo-600 disabled:opacity-50"
            >
              Add Date
            </button>
          </div>
        </div>
        <button 
          onClick={() => console.log("Saved Positions:", annotations)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2"
        >
          <Save size={16} /> Save Positions
        </button>
      </header>

      {/* Main View */}
      <main className="flex-1 overflow-auto p-8 flex justify-center bg-slate-100">
        <div className="w-full max-w-5xl">
          {file ? (
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <div className="shadow-2xl rounded-lg overflow-hidden bg-white">
                  <Viewer fileUrl={file} renderPage={renderPage} />
                </div>
              </Worker>
            </DndContext>
          ) : (
            <div className="h-[60vh] border-4 border-dashed rounded-3xl flex items-center justify-center text-slate-400">
              Please upload a document to start.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}