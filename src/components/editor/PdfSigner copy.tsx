/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from "react";
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
  Plus,
  Eye,
  Undo2,
  Signature,
  Calendar,
  FileText,
  Sparkle,
  Sparkles,
} from "lucide-react";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import { toast } from "sonner";

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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTargetPageInput(currentPage+1);
  }, [currentPage]);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  // const { jumpToPage } = pageNavigationPluginInstance;
  const sensors = [
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  ];
  // Inside your PdfSigner component
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const manualJumpToAnnotation = (annoId: string) => {
  const annoElement = document.getElementById(annoId);

  if (annoElement && scrollAreaRef.current) {
    annoElement.scrollIntoView({
      behavior: "smooth",
      block: "center", 
      inline: "nearest"
    });
  }
};

  const addAnnotation = (type: "signature" | "date") => {
    const pageIdx = targetPageInput - 1;
    if (pageIdx < 0 || pageIdx >= numPages) return;

    const alreadyExists = annotations.some((anno) => anno.type === type);

    if (alreadyExists) {
      toast.warning(`Only one ${type} tag allowed. Please delete the existing one first.`, {position: "top-center"});
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
    requestAnimationFrame(() => {
      manualJumpToPage(pageIdx);
    });
  };

  const manualJumpToPage = (pageIdx: number) => {
    // react-pdf-viewer labels pages starting from 0 in the data-testid
    const pageElement = document.querySelector(
      `[data-testid="core__page-layer-${pageIdx}"]`,
    );

    if (pageElement && scrollAreaRef.current) {
      // Find the viewport inside the ScrollArea (Radix specific selector)
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );

      if (viewport) {
        pageElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // Fallback for standard divs
        pageElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setAnnotations((prev) =>
      prev.map((anno) => {
        if (anno.id === active.id) {
          const pageContainer = document.querySelector(
            `[data-testid="core__page-layer-${anno.pageIndex}"]`,
          );

          // Raw potential positions
          let newX = anno.x + delta.x;
          let newY = anno.y + delta.y;

          if (pageContainer) {
            const { width, height } = pageContainer.getBoundingClientRect();

            // BUFFER: Prevents the card from being exactly on the edge
            const padding = 5;
            const cardWidth = 120; // Match your AnnotationItem width
            const cardHeight = 40; // Match your AnnotationItem height

            // REAPPEAR LOGIC: Clamp the values
            // If it goes off top, set to padding. If off bottom, set to height - cardHeight.
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
      <div>
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
      {/* KEY FIX: Added sm:max-w-none and w-screen to break Shadcn's default narrow width */}
      <DialogContent className="sm:max-w-none w-[98vw] h-[95vh] p-0 overflow-hidden flex flex-col gap-0 border-none rounded-xl">
        {/* Header */}
        <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b flex flex-row items-center justify-between space-y-0 shrink-0 bg-white">
          <div className="flex items-center gap-3">
            
            <DialogTitle className="text-sm sm:text-xl font-bold text-slate-800 truncate max-w-[150px] sm:max-w-none">
              Edit Template: Standard Consulting SOW
            </DialogTitle>
          </div>
          <div className="flex items-center gap-3 mr-8">
            
          </div>
        </DialogHeader>

        {/* Editor Body */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden ">
          {/* PDF Viewer - Left (Grows to fill space) */}
          <div className="flex-1 relative overflow-hidden flex justify-center border-r border-slate-200">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
              <div className="bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-400">PAGE</span>

                  <span className="text-sm font-medium text-[#003EC2]">
                    {currentPage + 1}
                  </span>
                  <span className="text-sm opacity-30">/</span>
                  <span className="text-sm font-medium text-slate-400">
                    {numPages}
                  </span>
                </div>
              </div>
            </div>
            <ScrollArea ref={scrollAreaRef} className="h-full w-full">
              <div className="p-4 sm:p-12 flex justify-center min-w-max sm:min-w-0">
                <div className="w-[350px] xs:w-[450px] sm:w-[600px] md:w-[700px] lg:w-[800px] transition-all duration-300">
                  {" "}
                  {/* Fixed width keeps PDF stable during zoom/render */}
                  <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToParentElement]}
                  >
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <div className="shadow-lg  rounded-sm overflow-hidden">
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
          </div>

          {/* Sidebar - Right (Fixed width) */}
          <aside className="w-[40vh] sm:h-auto sm:w-[320px] md:w-[380px] bg-white flex flex-col shrink-0 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)]">
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-5 sm:p-8">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                      <span className="text-sm uppercase tracking-widest">
                        Smart Tags
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      Configure variables to automate data entry in your
                      document.
                    </p>
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="signature"
                    className="w-full space-y-4"
                  >
                    <AccordionItem
                      value="signature"
                      className="border rounded-xl px-4 py-1 bg-white shadow-sm border-slate-200"
                    >
                      <AccordionTrigger className="hover:no-underline py-4 text-sm font-bold text-slate-700">
                        <div className="flex items-center gap-3">
                          <Signature size={18} className="text-slate-400" />{" "}
                          Signature
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-6">
                        <Button
                          onClick={() => addAnnotation("signature")}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-lg"
                        >
                          + Add Tag
                        </Button>
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label className="text-xs font-bold text-slate-500">
                              Page Number
                            </Label>
                            <Input
                              type="number"
                              value={targetPageInput}
                              onChange={(e) =>
                                setTargetPageInput(Number(e.target.value))
                              }
                              className="h-10 border-slate-200"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-2">
                              <Label className="text-xs font-bold text-slate-500">
                                Position X
                              </Label>
                              <Input
                                disabled
                                placeholder="120px"
                                className="h-10 bg-slate-50 text-slate-400"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label className="text-xs font-bold text-slate-500">
                                Position Y
                              </Label>
                              <Input
                                disabled
                                placeholder="250px"
                                className="h-10 bg-slate-50 text-slate-400"
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="date"
                      className="border rounded-xl px-4 py-1 bg-white shadow-sm border-slate-200"
                    >
                      <AccordionTrigger className="hover:no-underline py-4 text-sm font-bold text-slate-700">
                        <div className="flex items-center gap-3">
                          <Calendar size={18} className="text-slate-400" /> Date
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4">
                        <Button
                          onClick={() => addAnnotation("date")}
                          className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 border-none font-bold h-11 rounded-lg"
                        >
                          + Add Tag
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-12 p-5 bg-blue-50/80 rounded-2xl border border-blue-100">
                    <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-2">
                      Editor Tip
                    </p>
                    <p className="text-xs text-slate-600 leading-normal font-medium">
                      Expand a tag to accurately position it on the document
                      using coordinates.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Sticky Sidebar Footer */}
            <div className="p-6 border-t flex items-center justify-between bg-white shrink-0 gap-4">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="text-slate-500 font-bold hover:bg-slate-50 h-12 flex-1"
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 flex-1 rounded-xl shadow-md transition-all active:scale-95">
                Save Template
              </Button>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
