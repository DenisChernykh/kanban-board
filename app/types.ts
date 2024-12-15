export interface MyDocumentType {
  id: string;
  title: string;
  status: 'in-progress' | 'under-review' | 'completed';
}

export interface DocumentsState {
  documents: MyDocumentType[];
}

export interface ColumnProps {
  status: 'in-progress' | 'under-review' | 'completed';
  documents: MyDocumentType[];
}

export interface DraggableDocumentProps {
  document: MyDocumentType;
}

export interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}
