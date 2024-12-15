import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { ModalContextType } from '@/app/types';
import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import { HiXMark } from 'react-icons/hi2';

export const ModalContext = createContext<ModalContextType>({
  openName: '',
  open: () => {},
  close: () => {}, // Теперь close всегда будет функцией
});
function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState<string>('');
  const close = () => setOpenName('');
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: ReactElement<React.HTMLProps<HTMLElement>>;
  opens: string;
}) {
  const { open } = useContext(ModalContext) || {};
  if (!open) return null;
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({
  children,
  name,
}: {
  children: ReactElement<React.HTMLProps<HTMLElement>>;
  name: string;
}) {
  const { openName, close } = useContext(ModalContext) || {};

  const ref = useOutsideClick(close) as React.RefObject<HTMLDivElement>;
  if (name !== openName) return null;
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-backdrop-color backdrop-blur-lg z-50 transition-all duration-500 ">
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-grey-0 rounded-lg shadow-lg p-12 transition-all bg-white duration-500 border border-sky-500"
        ref={ref}
      >
        <Button
          variant="secondary"
          className=" absolute top-2 p-2 right-4 "
          onClick={close}
        >
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onClick: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
