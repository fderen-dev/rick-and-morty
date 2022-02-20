import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react';

import { Modal } from 'components/Modal';

const initialisationError = new Error('Modal context is not initalised');

interface IModalContext {
  isOpen: boolean;
  open: (content: ReactNode) => void;
  close: () => void;
}

const ModalContext = createContext<IModalContext>({
  close: () => {
    throw initialisationError;
  },
  isOpen: false,
  open: (content: ReactNode) => {
    throw initialisationError;
  }
});

export const ModalProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const open = useCallback((content: ReactNode) => {
    setContent(content);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ close, isOpen, open }}>
      {children}
      <Modal isOpen={isOpen} close={close}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
