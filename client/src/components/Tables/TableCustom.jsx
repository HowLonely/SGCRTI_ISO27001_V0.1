/* eslint-disable react/prop-types */
import { Button, Group, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { RiskForm } from "../ModalForms/RiskForm";
import { ControlForm } from "../ModalForms/ControlForm";
import { ProcessForm } from "../ModalForms/ProcessForm";

export const TableCustom = ({ data: initialData, columns, dataType}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(initialData); // Estado para los datos

  // Función para actualizar los datos después de realizar operaciones CRUD
  const updateData = (newData) => {
    setData(newData);
  };

  const handleEdit = (record) => {
    setSelectedItem(record);
    open(); // Abrir el modal al editar
  };

  const handleDelete = async (id) => {
    console.log(`Eliminar ${dataType} con ID:`, id);
    try {
      const response = await fetch(`http://localhost:8000/api/${dataType}s/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(`Registro con ID ${id} eliminado`);
      
      // Actualizar la lista de datos después de la eliminación
      const updatedData = data.filter(item => item.id !== id);
      updateData(updatedData);
      
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
                    {column.key !== "actions" && item[column.key]}
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
          opened={openedModal}
          onClose={() => close()} // Cerrar el modal al hacer clic en cerrar
          title={`Editar ${dataType}`} // Usar dataType para el título dinámico
          size="xl"
        >
          {dataType === "risk" && (
            <RiskForm
              initialValues={selectedItem}
              editMode={true}
              updateData={updateData} // Pasar función de actualización
              close={close} // Pasar función de cierre del modal
            />
          )}
          {dataType === "control" && (
            <ControlForm
              initialValues={selectedItem}
              editMode={true}
              updateData={updateData} // Pasar función de actualización
              close={close} // Pasar función de cierre del modal
            />
          )}
          {dataType === "process" && (
            <ProcessForm
              initialValues={selectedItem}
              editMode={true}
              updateData={updateData} // Pasar función de actualización
              close={close} // Pasar función de cierre del modal
            />
          )}
          {/* Agrega más condiciones para otros tipos de datos si es necesario */}
        </Modal>
      )}
    </>
  );
};
