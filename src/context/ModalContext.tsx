import { FC, ReactNode, createContext, useContext, useState } from 'react';

import Modal from "react-modal";

const initialisationError = new Error("Modal context is not initalised");

interface IModalContext {
  open: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<IModalContext>({
  closeModal: () => { throw initialisationError },
  open: false,
  openModal: (content: ReactNode) => { throw initialisationError }
});

export const ModalProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openModal = ( content: ReactNode ): void => {
    setContent(content);
    setOpen(true);
  }

  const closeModal = (): void => {
    setOpen(false);
    setContent(null);
  }

  return (
      <ModalContext.Provider value={ { closeModal, open, openModal } }>
          { children }
          <Modal isOpen={ open } onRequestClose={ closeModal }>
              { content }
          </Modal>
      </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);