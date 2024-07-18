// ModalContext.js
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const RiskModalContext = ({ children }) => {
  const [openedModal, setOpenedModal] = useState(false);
  const openModal = () => setOpenedModal(true);
  const closeModal = () => setOpenedModal(false);

  return (
    <ModalContext.Provider value={{ openedModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
