import Button from './ui/Button';
import CreateBoardForm from './CreateBoardForm';
import Modal from './ui/Modal';

function AddBoard() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="board-form">
          <Button className=' p-2'>Добавить доску</Button>
        </Modal.Open>
        <Modal.Window name="board-form">
          <CreateBoardForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBoard;
