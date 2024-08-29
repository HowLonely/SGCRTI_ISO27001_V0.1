import { Button, Group, Loader, Modal, Stack } from "@mantine/core";

import { TableCustom } from "../../components/Tables/TableCustom";

import { useFetch } from "../../hooks/useFetch";
import { RiskForm } from "../../components/ModalForms/Riesgos/RiskForm";
import {
  useModal,
} from "../../components/ModalForms/ModalContext";

import { ModalProvider } from "../../components/ModalForms/ModalContext";


const Riesgos = () => {
  const { openedModal, openModal, closeModal } = useModal();

  console.log("openedmodal: ", openedModal);


  // Fetchear datos
  const fetchRisk = useFetch("http://localhost:8000/api/risks/");

  // Datos de las tablas
  // Las KEY deben ser los nombres de las columnas de las tablas en el backend (Se podría hacer un mockup)
  const risk_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "probability", title: "Probabilidad" },
    { key: "impact", title: "Impacto" },
    { key: "inherent_risk", title: "Riesgo inherente" },
    { key: "residual_risk", title: "Riesgo residual" },
    { key: "actions", title: "" },
  ];


  const risks_data = fetchRisk.data;

  if (fetchRisk.isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Loader />
      </div>
    );
  }

  return (
    <Stack>
      <Group justify={"flex-start"}>
        {/* BODY */}
        <Modal
          h={300}
          opened={openedModal}
          onClose={closeModal}
          title="Crear riesgo"
          size={"xl"}
          centered
        >
          <RiskForm />
        </Modal>

        <Button 
        onClick={openModal} 
        variant="outline" size="md" radius={"md"}>
          Agregar riesgo
        </Button>
      </Group>

      {!fetchRisk.isLoading && (
        <TableCustom
          data={risks_data}
          columns={risk_columns}
          dataType={"risk"}
        />
      )}
    </Stack>
  );
};

const WrappedRiesgos = () => (
  <ModalProvider>
    <Riesgos />
  </ModalProvider>
);

export default WrappedRiesgos;