/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useRef } from "react";
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

import {
  Signature,
  Calendar,
} from "lucide-react";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import { toast } from "sonner";
import type { Annotation } from "@/service/Storage";

interface PdfSignerProps {
  initialFile: string;
  onClose: () => void;
  onSave: (annotations: Annotation[]) => void;
  isOpen: boolean;
}

export default function PdfSigner({ initialFile, onClose, onSave, isOpen }: PdfSignerProps) {
  // --- Functional State ---
  const [file] = useState<string>(initialFile);

  const [annotations, setAnnotations] = useState<any[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [targetPageInput, setTargetPageInput] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  // --- Refs & Plugins ---
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const sensors = [
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  ];

  // Sync targetPageInput with the current page view
  useEffect(() => {
    setTargetPageInput(currentPage + 1);
  }, [currentPage]);

  const handleClose = () => {
    onClose();
  };

  interface Annotation {
  id: string;
  type: 'signature' | 'date';
  pageIndex: number;
  xRatio: number;
  yRatio: number;
}

/**
 * Converts a raw 'any' array into a strict Annotation[] array.
 * This is useful for data coming from LocalStorage.
 */
 const convertToAnnotations = (rawArray: any[]): Annotation[] => {
  if (!Array.isArray(rawArray)) return [];

  return rawArray.map((item): Annotation => {
    return {
      // Ensure ID exists, or generate a temporary one
      id: String(item.id || Math.random().toString(36).substr(2, 9)),
      
      // Validate the type literal; default to 'signature' if invalid
      type: item.type === 'date' ? 'date' : 'signature',
      
      // Ensure numeric values, defaulting to 0 to prevent NaN bugs
      pageIndex: typeof item.pageIndex === 'number' ? item.pageIndex : 0,
      xRatio: typeof item.xRatio === 'number' ? item.xRatio : 0,
      yRatio: typeof item.yRatio === 'number' ? item.yRatio : 0,
    };
  });
};
  

  // --- Navigation Logic ---
  const manualJumpToPage = (pageIdx: number) => {
    const pageElement = document.querySelector(
      `[data-testid="core__page-layer-${pageIdx}"]`,
    );

    if (pageElement && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );

      if (viewport) {
        pageElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        pageElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const manualJumpToAnnotation = (annoId: string) => {
    const annoElement = document.getElementById(annoId);
    if (annoElement && scrollAreaRef.current) {
      annoElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // --- Annotation Logic ---
  const addAnnotation = (type: "signature" | "date") => {
    const pageIdx = targetPageInput - 1;
    if (pageIdx < 0 || pageIdx >= numPages) {
      toast.error("Invalid page number");
      return;
    }

    const alreadyExists = annotations.some((anno) => anno.type === type);

    if (alreadyExists) {
      toast.warning(`Only one ${type} tag allowed.`, {
        position: "top-center",
      });
      const existing = annotations.find((a) => a.type === type);
      if (existing) manualJumpToAnnotation(existing.id);
      return;
    }

    setAnnotations([
      ...annotations,
      {
        id: `${type}`,
        type,
        pageIndex: pageIdx,
        x: 50,
        y: 50,
        xRatio: 0,
        yRatio: 0,
      },
    ]);

    // Jump to the page where the tag was added
    setTimeout(() => manualJumpToPage(pageIdx), 100);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setAnnotations((prev) =>
      prev.map((anno) => {
        if (anno.id === active.id) {
          const pageContainer = document.querySelector(
            `[data-testid="core__page-layer-${anno.pageIndex}"]`,
          );

          let newX = anno.x + delta.x;
          let newY = anno.y + delta.y;

          if (pageContainer) {
            const { width, height } = pageContainer.getBoundingClientRect();
            const padding = 5;
            const cardWidth = width * 0.25; // Assuming the annotation card takes up 25% of the page width
            const cardHeight = height * 0.04; // Assuming the annotation card takes up 4% of the page height

            newX = Math.max(
              padding,
              Math.min(newX, width - cardWidth - padding),
            );
            newY = Math.max(
              padding,
              Math.min(newY, height - cardHeight - padding),
            );

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
      <div key={props.pageIndex}>
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
      <DialogContent
      onOpenAutoFocus={(e) => e.preventDefault()}
        showCloseButton={false}
        className="sm:max-w-none w-screen h-screen sm:w-[98vw] sm:h-[95vh] p-0 overflow-hidden flex flex-col gap-0 border-none sm:rounded-xl"
      >
        {/* Header */}
        <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b flex flex-row items-center justify-start space-y-0 shrink-0 bg-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <DialogTitle className="text-sm sm:text-xl font-bold text-slate-800 truncate max-w-37.5 sm:max-w-none">
              Edit Template
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Editor Body */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden ">
          {/* PDF Viewer - Left */}
          <div className="flex-1 relative overflow-hidden flex justify-center border-b sm:border-b-0 sm:border-r border-slate-200">
            <ScrollArea ref={scrollAreaRef} className="h-full w-full ">
              <div className="pt-8 pb-16  sm:pt-12 flex justify-center min-w-max sm:min-w-0">
                <div className="relative flex-1 overflow-hidden shadow-inner transition-all duration-300">
                  <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToParentElement]}
                  >
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <div className="shadow-lg rounded-sm overflow-hidden bg-white">
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
                </div>
              </div>
            </ScrollArea>

            {/* Page Floating Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-white/90 backdrop-blur shadow-sm px-4 py-2 rounded-full border border-slate-200 flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">PAGE</span>
                <span className="text-sm font-bold text-blue-600">
                  {currentPage + 1} / {numPages}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar - Right */}
          <aside className="h-[40vh] sm:h-auto sm:w-[320px] md:w-[380px] bg-white flex flex-col shrink-0 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)] z-10">
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-5 sm:p-8">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                      <span className="text-sm ">Smart Tags</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                      Configure variables to automate data entry in your
                      document.
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
                          <Signature
                            size={16}
                            className="text-slate-400 sm:w-[18px]"
                          />
                          Signature
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
                        <div className="flex flex-col items-start gap-2">
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
                          <Button
                          onClick={() => addAnnotation("signature")}
                          className="w-full bg-blue-100 text-blue-600 mt-2 hover:bg-blue-200 border-none font-medium h-9 sm:h-11 rounded-lg text-xs sm:text-sm"
                        >
                          + Add Tag
                        </Button>
                        </div>
                        
                        
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="date"
                      className="border rounded-xl px-3 sm:px-4 py-0 sm:py-1 bg-white shadow-sm border-slate-200"
                    >
                      <AccordionTrigger className="hover:no-underline py-3 sm:py-4 text-xs sm:text-sm font-bold text-slate-700">
                        <div className="flex items-center gap-3">
                          <Calendar
                            size={16}
                            className="text-slate-400 sm:w-[18px]"
                          />{" "}
                          Date
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-4 sm:pb-6">
                        <div className="flex flex-col items-start gap-2">
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
                          <Button
                          onClick={() => addAnnotation("date")}
                          className="w-full bg-blue-100 text-blue-600 mt-2 hover:bg-blue-200 border-none font-medium h-9 sm:h-11 rounded-lg text-xs sm:text-sm"
                        >
                          + Add Tag
                        </Button>
                        </div>
                        
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-8 sm:mt-12 p-4 sm:p-5 bg-blue-50/80 rounded-2xl border border-blue-100 mb-4 sm:mb-0">
                    <p className="text-sm font-medium text-blue-600  mb-1.5 sm:mb-2">
                      Editor Tip
                    </p>
                    <p className="text-xs text-slate-600 ">
                      Expand a tag to accurately position it on the document
                      using coordinates.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 sm:p-6 border-t flex items-center justify-between bg-white shrink-0 gap-3 sm:gap-4">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="text-slate-500 rounded-lg hover:bg-slate-50 h-13 flex-1 text-sm"
              >
                Cancel
              </Button>
              <Button onClick={() => onSave(convertToAnnotations(annotations))} className="rounded-lg text-sm shadow-lg shadow-blue-200/50 font-bold h-13 flex-1 transition-all " variant={"gradient"}
            >
                Save Template
              </Button>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
