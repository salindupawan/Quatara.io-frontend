/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDroppable } from "@dnd-kit/core";
import { AnnotationItem } from "./AnnotationItem";

export const PageOverlay = ({ pageIndex, annotations, onDelete }: any) => {
  const { setNodeRef } = useDroppable({
    id: `page-${pageIndex}`,
    data: { pageIndex },
  });

  return (
    <div
      ref={setNodeRef}
      className="absolute inset-0 w-full h-full"
      // style={{ zIndex: 100, pointerEvents: 'none' }}
    >
      {/* The relative container here acts as the "Parent Element" for the restriction */}
      <div className="relative w-full h-full" style={{ pointerEvents: "auto" }}>
        {annotations
          .filter((anno: any) => anno.pageIndex === pageIndex)
          .map((anno: any) => {
            const pageContainer = document.querySelector(
              `[data-testid="core__page-layer-${anno.pageIndex}"]`,
            );
            if (!pageContainer) return null;

            const { width, height } = pageContainer.getBoundingClientRect();
            return (
              <AnnotationItem
                key={anno.id}
                id={anno.id}
                type={anno.type}
                top={anno.y }
                left={anno.x }
                onDelete={onDelete}
                pageWidth={width}
                pageHeight={height}
                heightRatio={0.04}
                widthRatio={0.25}
              />
            );
          })}
      </div>
    </div>
  );
};
