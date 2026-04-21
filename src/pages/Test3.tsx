/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { 
  DndContext, 
  useDraggable, 
  useDroppable, 
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import { User, Banknote, Calendar, GripVertical, Plus, X } from 'lucide-react';

// --- Types ---
interface DroppedItem {
  id: string;
  label: string;
  top: number; // px
  left: number; // px
}

export default function SOWEditor() {
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [activeItem, setActiveItem] = useState<any>(null);
  
  // Create a ref for the PDF container to get its exact position
  const canvasRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 8 },
  }));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem(event.active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, activatorEvent } = event;
    setActiveItem(null);

    // Only proceed if we dropped over the canvas
    if (!over || over.id !== 'pdf-canvas' || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseEvent = activatorEvent as MouseEvent;

    // 1. Calculate the raw drop position relative to the viewport
    // 2. Subtract the canvas's top/left offset
    // 3. Subtract half the item's approximate height/width so it drops centered on cursor
    const dropX = mouseEvent.clientX - rect.left;
    const dropY = mouseEvent.clientY - rect.top;

    // Check if we are dragging from sidebar or moving an existing item
    if (active.id.toString().startsWith('sidebar-')) {
      const newItem: DroppedItem = {
        id: `dropped-${Date.now()}`,
        label: active.data.current?.label,
        left: dropX,
        top: dropY,
      };
      setDroppedItems((prev) => [...prev, newItem]);
    } else {
      // Logic for moving existing items within the canvas
      setDroppedItems((prev) => prev.map(item => {
        if (item.id === active.id) {
          return {
            ...item,
            left: item.left + event.delta.x,
            top: item.top + event.delta.y
          };
        }
        return item;
      }));
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-gray-100 p-6 gap-6">
        
        {/* PDF VIEWPORT */}
        <div className="flex-1 bg-gray-300 rounded-lg p-10 overflow-auto flex justify-center">
          <div 
            ref={canvasRef}
            id="pdf-canvas"
            className="relative bg-white w-[600px] h-[800px] shadow-2xl p-12 overflow-hidden"
          >
            <CanvasDroppableZone />
            
            <h1 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">Statement of Work</h1>
            <p className="text-gray-400 text-sm">Draft Content...</p>

            {/* PLACED ITEMS */}
            {droppedItems.map((item) => (
              <PlacedTag key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-80 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
            <span>✨</span> Smart Tags
          </h3>
          <div className="space-y-3">
            {TAG_DATA.map((tag) => (
              <SidebarItem key={tag.id} tag={tag} />
            ))}
          </div>
        </div>
      </div>

      {/* DRAG OVERLAY (The visual ghost while dragging) */}
      <DragOverlay>
        {activeItem ? (
          <div className="flex items-center justify-between p-3 bg-white border-2 border-blue-500 rounded-lg shadow-2xl opacity-90 w-64 cursor-grabbing scale-105 transition-transform">
            <div className="flex items-center gap-3">
              <GripVertical size={14} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">{activeItem.label}</span>
            </div>
            <div className="text-blue-500">{activeItem.icon}</div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

// --- Internal Helper Components ---

function PlacedTag({ item }: { item: DroppedItem }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = {
    top: item.top,
    left: item.left,
    // Add transform so user can move it again once placed
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-md border border-orange-300 text-[11px] font-bold shadow-sm cursor-move hover:bg-orange-200 transition-colors"
    >
      {`{{${item.label.replace(/\s+/g, '_')}}}`}
    </div>
  );
}

function SidebarItem({ tag }: { tag: any }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${tag.id}`,
    data: { label: tag.label, icon: tag.icon }
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center justify-between p-3 bg-gray-50 border rounded-lg cursor-grab hover:border-blue-300 transition-all ${isDragging ? 'opacity-20' : ''}`}
    >
      <div className="flex items-center gap-3">
        <GripVertical size={14} className="text-gray-400" />
        <span className="text-sm font-medium text-gray-700">{tag.label}</span>
      </div>
      <div className="text-gray-400">{tag.icon}</div>
    </div>
  );
}

function CanvasDroppableZone() {
  const { setNodeRef } = useDroppable({ id: 'pdf-canvas' });
  return <div ref={setNodeRef} className="absolute inset-0 z-0" />;
}

const TAG_DATA = [
  { id: '1', label: 'Client Name', icon: <User size={16} /> },
  { id: '2', label: 'Project Fee', icon: <Banknote size={16} /> },
  { id: '3', label: 'Deadline', icon: <Calendar size={16} /> },
];