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

interface ModalState {
  content: ReactNode;
  options?: ModalOptions;
}
interface ModalOptions {
  hasCloseButton?: boolean;
}

const modalInitialState: ModalState = {
  content: null,
  options: undefined
};

interface IModalContext {
  isOpen: boolean;
  open: (
    content: ModalState['content'],
    options?: ModalState['options']
  ) => void;
  close: () => void;
}

const ModalContext = createContext<IModalContext>({
  close: () => {
    throw initialisationError;
  },
  isOpen: false,
  open: (content: ModalState['content'], options?: ModalState['options']) => {
    throw initialisationError;
  }
});

export const ModalProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>(modalInitialState);

  const open = useCallback(
    (content: ModalState['content'], options?: ModalState['options']) => {
      setModalState({ content, options });
      setIsOpen(true);
    },
    []
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setModalState(modalInitialState);
  }, []);

  return (
    <ModalContext.Provider value={{ close, isOpen, open }}>
      {children}
      <Modal
        isOpen={isOpen}
        close={close}
        showCloseButton={modalState.options?.hasCloseButton}
      >
        {modalState.content}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
