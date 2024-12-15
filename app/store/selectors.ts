import { RootState } from './store';

export const getDocuments = (state: RootState) => state.documents.documents;
