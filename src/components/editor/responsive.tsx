/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from "react";
import { Viewer, Worker, type RenderPageProps } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import {
  DndContext,
  type DragEndEvent,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { PageOverlay } from "./PageOverlay";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Plus, Eye, Undo2, Signature, Calendar, FileText, X } from "lucide-react";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

interface PdfSignerProps {
  initialFile: string;
  onClose: () => void;
}

export default function PdfSigner({ initialFile, onClose }: PdfSignerProps) {
  const [file] = useState<string>(initialFile);
  const [isOpen, setIsOpen] = useState(true);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [targetPageInput, setTargetPageInput] = useState(1);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;
  const sensors = [
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  ];

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const addAnnotation = (type: "signature" | "date") => {
    const pageIdx = targetPageInput - 1;
    if (pageIdx < 0 || pageIdx >= numPages) return;

    setAnnotations([
      ...annotations,
      {
        id: `${type}-${Date.now()}`,
        type,
        pageIndex: pageIdx,
        x: 50,
        y: 50,
        xRatio: 0,
        yRatio: 0,
      },
    ]);
    jumpToPage(pageIdx);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    setAnnotations((prev) =>
      prev.map((anno) => {
        if (anno.id === active.id) {
          const pageContainer = document.querySelector(
            `[data-testid="core__page-layer-${anno.pageIndex}"]`,
          );
          const newX = anno.x + delta.x;
          const newY = anno.y + delta.y;
          if (pageContainer) {
            const { width, height } = pageContainer.getBoundingClientRect();
            return {
              ...anno,
              x: newX,
              y: newY,
              xRatio: newX / width,
              yRatio: newY / height,
            };
          }
          return { ...anno, x: newX, y: newY };
        }
        return anno;
      }),
    );
  };

  const renderPage = useCallback(
    (props: RenderPageProps) => (
      <div className="relative shadow-2xl bg-white rounded-sm overflow-hidden ring-1 ring-slate-200 mx-auto">
        {props.canvasLayer.children}
        {props.textLayer.children}
        {props.annotationLayer.children}
        <PageOverlay
          pageIndex={props.pageIndex}
          annotations={annotations}
          onDelete={(id: string) =>
            setAnnotations(annotations.filter((a) => a.id !== id))
          }
        />
      </div>
    ),
    [annotations],
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-none w-screen h-screen sm:w-[98vw] sm:h-[95vh] p-0 overflow-hidden flex flex-col gap-0 border-none sm:rounded-xl">
        {/* Header */}
        <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b flex flex-row items-center justify-between space-y-0 shrink-0 bg-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg text-white">
              <FileText size={18} className="sm:w-5 sm:h-5" />
            </div>
            <DialogTitle className="text-sm sm:text-xl font-bold text-slate-800 truncate max-w-[150px] sm:max-w-none">
              Edit Template
            </DialogTitle>
          </div>
          <div className="flex items-center gap-1 sm:gap-3 sm:mr-8">
            <Button
              variant="outline"
              size="sm"
              className="text-slate-600 gap-1 sm:gap-2 font-semibold h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3"
            >
              <Undo2 size={14} className="sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Undo</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 gap-1 sm:gap-2 font-semibold h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3"
            >
              <Eye size={14} className="sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Preview</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleClose} className="sm:hidden">
              <X size={20} />
            </Button>
          </div>
        </DialogHeader>

        {/* Editor Body */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden bg-[#F8FAFC]">
          {/* PDF Viewer - Left (Grows to fill space) */}
          <div className="flex-1 relative overflow-hidden flex justify-center border-b sm:border-b-0 sm:border-r border-slate-200">
            <ScrollArea className="h-full w-full">
              <div className="p-4 sm:p-12 flex justify-center min-w-max sm:min-w-0">
                {/* Responsive width container for PDF */}
                <div className="w-[350px] xs:w-[450px] sm:w-[600px] md:w-[700px] lg:w-[800px] transition-all duration-300">
                  <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToParentElement]}
                  >
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer
                          fileUrl={file}
                          renderPage={renderPage}
                          plugins={[pageNavigationPluginInstance]}
                          onDocumentLoad={(e) => setNumPages(e.doc.numPages)}
                        />
                    </Worker>
                  </DndContext>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Sidebar - Bottom on mobile, Right on desktop */}
          <aside className="h-[40vh] sm:h-auto sm:w-[320px] md:w-[380px] bg-white flex flex-col shrink-0 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)] z-10">
            <div className="flex-1 min-h-0"> {/* Wrapper for ScrollArea to prevent overflow issues */}
              <ScrollArea className="h-full">
                <div className="p-5 sm:p-8">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                      <Plus size={16} strokeWidth={3} className="sm:w-[18px]" />
                      <span className="text-[10px] sm:text-sm uppercase tracking-widest">
                        Smart Tags
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                      Configure variables to automate data entry in your document.
                    </p>
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="signature"
                    className="w-full space-y-3 sm:space-y-4"
                  >
                    <AccordionItem
                      value="signature"
                      className="border rounded-xl px-3 sm:px-4 py-0 sm:py-1 bg-white shadow-sm border-slate-200"
                    >
                      <AccordionTrigger className="hover:no-underline py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-700">
                        <div className="flex items-center gap-3">
                          <Signature size={16} className="text-slate-400 sm:w-[18px]" />{" "}
                          Signature
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
                        <Button
                          onClick={() => addAnnotation("signature")}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 sm:h-11 rounded-lg text-xs sm:text-sm"
                        >
                          + Add Tag
                        </Button>
                        <div className="space-y-3 sm:space-y-4">
                          <div className="grid gap-1.5 sm:gap-2">
                            <Label className="text-[10px] sm:text-xs font-bold text-slate-500">
                              Page Number
                            </Label>
                            <Input
                              type="number"
                              value={targetPageInput}
                              onChange={(e) =>
                                setTargetPageInput(Number(e.target.value))
                              }
                              className="h-8 sm:h-10 border-slate-200 text-xs sm:text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            <div className="grid gap-1.5 sm:gap-2">
                              <Label className="text-[10px] sm:text-xs font-bold text-slate-500">
                                Position X
                              </Label>
                              <Input
                                disabled
                                placeholder="120px"
                                className="h-8 sm:h-10 bg-slate-50 text-slate-400 text-xs sm:text-sm"
                              />
                            </div>
                            <div className="grid gap-1.5 sm:gap-2">
                              <Label className="text-[10px] sm:text-xs font-bold text-slate-500">
                                Position Y
                              </Label>
                              <Input
                                disabled
                                placeholder="250px"
                                className="h-8 sm:h-10 bg-slate-50 text-slate-400 text-xs sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="date"
                      className="border rounded-xl px-3 sm:px-4 py-0 sm:py-1 bg-white shadow-sm border-slate-200"
                    >
                      <AccordionTrigger className="hover:no-underline py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-700">
                        <div className="flex items-center gap-3">
                          <Calendar size={16} className="text-slate-400 sm:w-[18px]" /> Date
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-3 sm:pb-4">
                        <Button
                          onClick={() => addAnnotation("date")}
                          className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 border-none font-bold h-9 sm:h-11 rounded-lg text-xs sm:text-sm"
                        >
                          + Add Tag
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-8 sm:mt-12 p-4 sm:p-5 bg-blue-50/80 rounded-2xl border border-blue-100 mb-4 sm:mb-0">
                    <p className="text-[9px] sm:text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1.5 sm:mb-2">
                      Editor Tip
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-600 leading-normal font-medium">
                      Expand a tag to accurately position it on the document using
                      coordinates.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Sticky Sidebar Footer - Now guaranteed to stay visible */}
            <div className="p-4 sm:p-6 border-t flex items-center justify-between bg-white shrink-0 gap-3 sm:gap-4">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="text-slate-500 font-bold hover:bg-slate-50 h-10 sm:h-12 flex-1 text-xs sm:text-sm"
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 sm:h-12 flex-1 rounded-xl shadow-md transition-all active:scale-95 text-xs sm:text-sm">
                Save Template
              </Button>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}