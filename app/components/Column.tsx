import { useDroppable } from '@dnd-kit/core';
import { ReactNode, useEffect, useState } from 'react';
import DraggableDocument from './DraggableDocument';
import { ColumnProps } from '../types';



function DroppableColumn({ status, documents }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: status });
  const statusLabels: Record<
    'in-progress' | 'under-review' | 'completed',
    string
  > = {
    'in-progress': 'В работе',
    'under-review': 'На проверке',
    completed: 'Завершено',
  };

  return (
    <div ref={setNodeRef} className="  bg-gray-800 p-4 rounded shadow">
      <h2 className=" w-full py-5 text-center shadow-md bg-slate-200 mb-4 ">
        {statusLabels[status]}
      </h2>
      <Column hasDocuments={documents.length > 0}>
        {documents.map((doc) => (
          <DraggableDocument key={doc.id} document={doc} />
        ))}
      </Column>
    </div>
  );
}

function Column({
  children,
  hasDocuments,
}: {
  children: ReactNode;
  hasDocuments: boolean;
}) {
  
  return (
    <div
      className={` ${
        hasDocuments ? 'border' : ''
      } flex items-center gap-y-4 flex-col rounded-md py-4`}
    >
      {children}
    </div>
  );
}

export default DroppableColumn;
