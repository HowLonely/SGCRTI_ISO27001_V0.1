import { Button, Group, Modal, Stack } from "@mantine/core";
import { useFetch } from "../../hooks/useFetch";
import { TableCustom } from "../../components/Tables/TableCustom";
import { useDisclosure } from "@mantine/hooks";
import { ControlForm } from "../../components/ModalForms/ControlForm";

export const Controles = () => {
  const [openedModal, { open, close }] = useDisclosure(false);

  const fetchControl = useFetch("http://localhost:8000/api/controls/");

  const control_columns = [
    { key: "id", title: "Código" },
    { key: "name", title: "Nombre" },
    { key: "type", title: "Tipo de control" },
    { key: "execution", title: "Forma que se ejecuta" },
    { key: "flexibility", title: "Flexibilidad" },
    { key: "efficacy", title: "Eficacia" },
    { key: "actions", title: "" },
  ];

  const controls_data = fetchControl.data;

  return (
    <Stack>
      <Group justify={"flex-start"}>
        {/* BODY */}
        <Modal
          h={300}
          opened={openedModal}
          onClose={close}
          title="Crear riesgo"
          size={"xl"}
          centered
        >
          <ControlForm />
        </Modal>

        <Button onClick={open} variant="outline" size="md" radius={"md"}>
          Agregar control
        </Button>
      </Group>

      {/* Mostrar la tabla de controles */}
      {!fetchControl.isLoading && (
        <TableCustom data={controls_data} columns={control_columns} dataType={"control"}/>
      )}
    </Stack>
  );
};
