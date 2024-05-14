import { Table } from "@mantine/core";

export const RiskTable = () => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Código</Table.Th>
          <Table.Th>Nombre</Table.Th>
          <Table.Th>Probabilidad</Table.Th>
          <Table.Th>Riesgo</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{/* */}</Table.Tbody>
    </Table>
  );
};
