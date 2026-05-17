/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Signature, Calendar, Trash2 } from "lucide-react";

interface Props {
  id: string;
  type: "signature" | "date";
  top: number;
  left: number;
  onDelete: (id: string) => void;
  pageWidth: number; 
  pageHeight: number;
  widthRatio: number; 
  heightRatio: number;
}

export const AnnotationItem = ({
  id,
  type,
  top,
  left,
  onDelete,
  pageWidth,
  pageHeight,
  widthRatio,
  heightRatio,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  // Calculate dynamic dimensions based on ratios provided
  const currentWidth = pageWidth * widthRatio;
  const currentHeight = pageHeight * heightRatio;


  // Scaling factor: Adjusts internal elements so they don't look huge on small screens
  // We use 120px (standard desktop width) as our baseline for "1x" scale

  const scaleFactor = Math.max(0.55, Math.min(currentWidth / 120, 1));
  const scale = scaleFactor < 1 ? 0.3 : 1;


  const style: React.CSSProperties = {
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    width: `${currentWidth}px`,
    height: `${currentHeight}px`,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    zIndex: isDragging ? 2000 : 1000,
    touchAction: "none",
    pointerEvents: "auto",
    visibility: "visible",
    willChange: "transform",
    backfaceVisibility: "hidden",
    border: `${3 * scaleFactor* 0.7 }px solid rgba(59, 130, 246, 0.8)`,
    borderRadius: `${10 * scaleFactor* 0.7 }px`,
    
  };

  return (
    <div
      id={id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        flex items-center justify-between
        bg-white/95 backdrop-blur-sm 
         shadow-lg cursor-grab active:cursor-grabbing 
        hover:bg-blue-50
        ${isDragging ? "opacity-40 ring-1 sm:ring-2 ring-blue-400 " : ""}
      `}
    >
      <div className="flex items-center min-w-0 overflow-hidden" style={{ padding: `${4 * scaleFactor}px ${8 * scaleFactor}px` }}>
        <div>
          {type === "signature" ? (
          <Signature 
            size={20 * scale} 
            className="text-blue-600 shrink-0" 
            strokeWidth={2.5}
          />
        ) : (
          <Calendar 
            size={20 * scale} 
            className="text-blue-600 shrink-0" 
            strokeWidth={2.5}
          />
        )}
        </div>
        
        
          <span 
          className="mt-0.5 font-medium uppercase text-slate-800 select-none truncate"
          style={{ fontSize: `${Math.max(2 ,20 * scale)}px`, letterSpacing: '0.025em' , marginLeft: `${12 * scale}px` }}
        >
          {type}
        </span>
        
      </div>

      <button
        onPointerDown={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className=" flex items-center justify-center hover:text-red-600 text-slate-300 transition-colors"
        style={{ width: `${24 * scaleFactor}px` , marginRight: `${6 * scale}px` }}
      >
        <Trash2 size={20 * scale} />
      </button>
    </div>
  );
};