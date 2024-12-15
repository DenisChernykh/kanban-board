import { DocumentsState } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

const initialState: DocumentsState = {
  documents: [
    { id: '1', title: 'Документ 1', status: 'in-progress' },
    { id: '2', title: 'Документ 2', status: 'under-review' },
    { id: '3', title: 'Документ 3', status: 'completed' },
  ],
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocumentStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: 'in-progress' | 'under-review' | 'completed';
      }>
    ) => {
      const { id, status } = action.payload;
      const document = state.documents.find((doc) => doc.id === id);
      if (document) {
        document.status = status;
      }
    },
    setNewDocument(state, action) {
      const id = uuidv4();
      const title = action.payload;
      const status = 'in-progress';
      state.documents.push({ id, title, status });
    },
  },
});

export const { setDocumentStatus, setNewDocument } = documentSlice.actions;
export const getDocuments = (state: RootState) => state.documents.documents;
export default documentSlice.reducer;
