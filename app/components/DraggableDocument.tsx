'use client';
import { useDraggable } from '@dnd-kit/core';
import { DraggableDocumentProps } from '../types';

function DraggableDocument({ document }: DraggableDocumentProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: document.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      aria-describedby={`DndDescribedBy-${document.id}`}
      className={`border p-2  bg-white rounded shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {document.title}
    </div>
  );
}

export default DraggableDocument;
