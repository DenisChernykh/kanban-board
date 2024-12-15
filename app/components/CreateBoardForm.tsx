import { useDispatch } from 'react-redux';
import { setNewDocument } from '../store/slices/documentSlice';
import { FormEvent, useContext, useState } from 'react';
import Button from './ui/Button';
import { ModalContext } from './ui/Modal';

function CreateBoardForm() {
  const dispatch = useDispatch();
  const [documentName, setDocumentName] = useState('');
  const { close } = useContext(ModalContext);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!documentName) return;
    dispatch(setNewDocument(documentName));
    setDocumentName('');
    close();
  }
  return (
    <div className=" relative">
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-y-4 mb-4">
          <label className=" text-black text-3xl" htmlFor="createDocument">
            Введите название документа
          </label>
          <input
            onChange={(e) => setDocumentName(e.target.value)}
            id="createDocument"
            className=" p-2 border-orange-300 border"
            type="text"
          />
        </div>
        <Button className=" p-2 w-full">Добавить документ</Button>
      </form>
    </div>
  );
}

export default CreateBoardForm;
