/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import {
  SpecialZoomLevel,
  Viewer,
  Worker,
  type RenderPageProps,
} from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import SignaturePad from "react-signature-canvas";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import { StorageService } from "@/service/StorageService";
import type { OnboardingData } from "@/service/Storage";
import ConsentDialog from "@/components/wizard/ConsentDialog";

const SignatureComponent = (SignaturePad as any).default || SignaturePad;

interface SimplePdfViewerProps {
  fileUrl: string;
}

const SimplePdfViewer: React.FC<SimplePdfViewerProps> = ({ fileUrl }) => {
  const [signature, setSignature] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [showSigPad, setShowSigPad] = useState(false);
  const sigCanvas = useRef<any>({});
  const [showConsent, setShowConsent] = useState(false);
  const [data] = useState<OnboardingData | undefined>(() => {
    return (
      StorageService.get<OnboardingData>("quatara_current_project") || undefined
    );
  });
  const signatureAnnotation =
    data?.annotations.find((a) => a.type === "signature") || null;
  const dateAnnotation =
    data?.annotations.find((a) => a.type === "date") || null;

  const zoomPluginInstance = zoomPlugin({
    enableShortcuts: true,
  });

  // This triggers AFTER the signature state changes and the DOM updates
  useEffect(() => {
    if (signature) {
      // We give it a tiny timeout to ensure the PDF viewer has painted the page layer
      setTimeout(() => {
        const annoElement = document.getElementById("signature_container");
        if (annoElement) {
          annoElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  }, [signature]);

  const handleConfirmSignature = () => {
    if (!sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      setSignature(dataUrl);
      setDate(new Date().toLocaleDateString());
      setShowSigPad(false);
    }
  };

  const handleConsentComplete = () => {
    setShowConsent(false);
    setShowSigPad(true); // Open the signature pad ONLY after consent
  };

  const renderPage = (props: RenderPageProps) => {
    const pageContainer = document.querySelector(
      `[data-testid="core__page-layer-${signatureAnnotation?.pageIndex}"]`,
    );
    if (!pageContainer) {
      return <div></div>;
    }

    const { width, height } = pageContainer.getBoundingClientRect();
    // Calculate dynamic dimensions based on ratios provided
    const currentWidth = width * 0.25;
    const currentHeight = height * 0.04;

    // Scaling factor: Adjusts internal elements so they don't look huge on small screens
    // We use 120px (standard desktop width) as our baseline for "1x" scale

    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(d.getDate()).padStart(2, "0");

    const customDate = `${year}-${month}-${day}`; // "2026-04-28"

    return (
      <>
        {props.canvasLayer.children}
        {props.textLayer.children}
        {props.annotationLayer.children}

        {/* Only render signature if this is the correct page and signature exists */}
        {signature &&
          signatureAnnotation &&
          props.pageIndex === signatureAnnotation.pageIndex && (
            <div
              id="signature_container"
              style={{
                position: "absolute",
                left: `${signatureAnnotation.xRatio * width}px`,
                top: `${signatureAnnotation.yRatio * height}px`,
                transform: "translate(0%, 0%)", // Centers the image on the coordinate
                zIndex: 10,
                scale: "1", // Adjust size as needed
                pointerEvents: "none", // Allows clicking through the signature to PDF text
              }}
            >
              <img
                src={signature}
                alt="User Signature"
                className="object-contain"
                style={{
                  mixBlendMode: "multiply",
                  width: `${0.25 * width}px`,
                  height: `${0.04 * height}px`,
                }} // Removes white background from canvas
              />
            </div>
          )}

        {date &&
          dateAnnotation &&
          props.pageIndex === dateAnnotation.pageIndex && (
            <div
              style={{
                width: `${currentWidth}px`,
                height: `${currentHeight}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "absolute",
                // your x/y coordinates here
                left: `${dateAnnotation.xRatio * width}px`,
                top: `${dateAnnotation.yRatio * height}px`,
              }}
            >
              <svg
                viewBox="0 0 100 20" // Adjust height (20) based on how "tall" you want the font
                preserveAspectRatio="xMidYMid meet"
                width="100%"
                height="100%"
              >
                <text
                  x="50"
                  y="15"
                  textAnchor="middle"
                  fontSize="10"
                  fill="black"
                  fontFamily="sans-serif"
                >
                  {customDate}
                </text>
              </svg>
            </div>
          )}
      </>
    );
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-gray-100">
      {/* 1. PDF Viewport Container */}
      <div className="relative flex-1 overflow-hidden shadow-inner">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={data?.pdfUrl || fileUrl}
            plugins={[zoomPluginInstance]}
            defaultScale={SpecialZoomLevel.PageWidth}
            renderPage={renderPage}
          />
        </Worker>

        {/* 2. SIGNATURE OVERLAY */}
        {/* Positioned absolutely over the viewer. Adjust bottom/right to match your PDF layout */}
        {/* {signature && (
          <div className="absolute bottom-[20%] right-[15%] pointer-events-none z-10">
            <img 
              src={signature} 
              alt="Signature" 
              className="w-32 md:w-48 h-auto opacity-90"
              style={{ mixBlendMode: 'multiply' }} 
            />
          </div>
        )} */}

        {/* 3. FLOATING BUTTON */}
        {/* Pinned to the bottom right of the viewer viewport */}
        <button
          onClick={() => setShowConsent(true)}
          className="absolute bottom-6 right-8 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all hover:scale-110 active:scale-95 hover:bg-blue-700"
          title="Sign Document"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>

      {showConsent && (
        <ConsentDialog
          onClose={() => setShowConsent(false)}
          onConfirm={handleConsentComplete}
        />
      )}

      {/* 4. SIGNATURE MODAL */}
      {showSigPad && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="text-lg font-bold">Sign Here</h3>
            </div>

            <div className="p-4">
              <div className="border rounded-lg bg-white overflow-hidden aspect-3/1 w-full relative">
                <SignatureComponent
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{
                    className: "w-full h-40 cursor-crosshair",
                  }}
                />
              </div>
            </div>

            <div className="p-4 flex gap-2 justify-end border-t bg-gray-50">
              <button
                onClick={() => setShowSigPad(false)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => sigCanvas.current.clear()}
                className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleConfirmSignature}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplePdfViewer;
