import { Button, Group, Modal, Table, Badge } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { RiskForm } from "../ModalForms/Riesgos/RiskForm";
import { ControlForm } from "../ModalForms/Controles/ControlForm";

export const TableCustom = ({
  data: initialData,
  columns,
  dataType,
  openedModal,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(initialData); // Estado para los datos

  const [openedModalEdit, setOpenedModalEdit] = useState(false);

  const openModal = () => setOpenedModalEdit(true);
  const closeModal = () => setOpenedModalEdit(false);

  useEffect(() => {
    if (openedModal) {
      openModal();
    } else {
      closeModal();
    }
  }, [openedModal]);

  const handleEdit = (record) => {
    setSelectedItem(record);
    openModal(); // Abrir el modal al editar
  };

  const handleDelete = async (id) => {
    console.log(`Eliminar ${dataType} con ID:`, id);
    try {
      const response = await fetch(
        `http://localhost:8000/api/${dataType}s/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(`Registro con ID ${id} eliminado`);

      // Actualiza el estado de los datos después de eliminar
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  return (
    <>
      <Table.ScrollContainer>
        <Table>
          <Table.Thead>
            <Table.Tr>
              {columns.map((column) => (
                <Table.Th key={column.key}>{column.title}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((item) => (
              <Table.Tr key={item.id}>
                {columns.map((column) => (
                  <Table.Td key={column.key}>
                    {column.key === "actions" && (
                      <Group spacing="xs">
                        <Button
                          variant="light"
                          color="yellow"
                          onClick={() => handleEdit(item)}
                        >
                          <IconEdit size={16} />
                        </Button>
                        <Button
                          variant="light"
                          color="red"
                          onClick={() => handleDelete(item.id)}
                        >
                          <IconTrash size={16} />
                        </Button>
                      </Group>
                    )}
                    {column.key === "status" &&
                      (item[column.key] === 0
                        ? <Badge variant="light" color="gray" radius="md">Pendiente</Badge>
                        : item[column.key] === 1
                        ? <Badge variant="light" color="green" radius="md">Aprobado</Badge>
                        : item[column.key] === 2
                        ? <Badge variant="light" color="red" radius="md">Rechazado</Badge>
                        : "Desconocido")} {/* Maneja los valores de estado */}
                    {column.key !== "actions" && column.key !== "status" && item[column.key]}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {/* Modal para editar */}
      {selectedItem && (
        <Modal
          h={300}
          centered
          opened={openedModalEdit}
          onClose={closeModal} // Cerrar el modal al hacer clic en cerrar
          title={`Editar ${dataType}`} // Usar dataType para el título dinámico
          size="xl"
        >
          {dataType === "risk" && (
            <RiskForm
              initialValues={selectedItem}
              editMode={true}
              close={closeModal} // Pasar función de cierre del modal
            />
          )}
          {dataType === "control" && (
            <ControlForm
              initialValues={selectedItem}
              editMode={true}
              opened={openedModalEdit}
              close={closeModal} // Pasar función de cierre del modal
            />
          )}
          {dataType === "process" && (
            <ProcessForm
              initialValues={selectedItem}
              editMode={true}
              close={closeModal} // Pasar función de cierre del modal
            />
          )}
          {/* Agrega más condiciones para otros tipos de datos si es necesario */}
        </Modal>
      )}
    </>
  );
};
