// src/components/ModalForms/RiskModalContext.js

import { createContext, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

// Crea un contexto
const ModalContext = createContext();

// Proveedor del contexto
export const ModalProvider = ({ children }) => {
  const [openedModal, setOpenedModal] = useState(false);

  const openModal = () => setOpenedModal(true);
  const closeModal = () => setOpenedModal(false);

  const navigate = useNavigate();

  const handleFormSubmitSuccess = () => {
    console.log("handleformsubmitsucess");
    navigate(0);
    // Aquí podrías agregar lógica adicional, como actualizar la lista de riesgos
  };

  return (
    <ModalContext.Provider value={{ openedModal, openModal, closeModal, handleFormSubmitSuccess }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal debe ser usado dentro de un RiskModalProvider');
  }
  return context;
};
