'use client';
import { useSelector } from 'react-redux';
import { getDocuments, setDocumentStatus } from '../store/slices/documentSlice';
import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { MyDocumentType } from '../types';
import { useDispatch } from 'react-redux';

import DroppableColumn from './Column';
import AddBoard from './AddBoard';

function KanbanBoard() {
  const documents = useSelector(getDocuments);
  const dispatch = useDispatch();
  const [draggedDocument, setDraggedDocument] = useState<MyDocumentType | null>(
    null
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const document = documents.find((doc) => doc.id === String(active.id));
    if (document) {
      setDraggedDocument(document);
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const newStatus = over?.id as
        | 'in-progress'
        | 'under-review'
        | 'completed';
      if (newStatus) {
        dispatch(
          setDocumentStatus({ id: String(active.id), status: newStatus })
        );
      }
      setDraggedDocument(null);
    }
  };
  const statuses: ('in-progress' | 'under-review' | 'completed')[] = [
    'in-progress',
    'under-review',
    'completed',
  ];
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className=" grid grid-cols-3 gap-x-5 mb-8">
        {statuses.map((status) => (
          <DroppableColumn
            key={status}
            status={status}
            documents={documents.filter((doc) => doc.status === status)}
          />
        ))}
      </div>
      <DragOverlay>
        {draggedDocument ? (
          <div className=" border p-2 bg-white rounded shadow">
            {draggedDocument.title}
          </div>
        ) : null}
      </DragOverlay>
      <AddBoard />
    </DndContext>
  );
}

export default KanbanBoard;
