/* eslint-disable react/prop-types */
import { Table, Checkbox } from "@mantine/core";
import { useState } from "react";

export const TableAsociation = ({
  data,
  columns,
  selectedIds,
  setSelectedIds,
}) => {
  const [selectedRows] = useState([]);

  const handleCheckBoxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const rows = data.map((item) => (
    <Table.Tr
      key={item.name}
      bg={
        selectedRows.includes(item.id)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedIds.includes(item.id)}
          onChange={() => handleCheckBoxChange(item.id)}
        />
      </Table.Td>

      {columns.map((column) => (
        <Table.Td key={column.key}>{item[column.key]}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer h={250}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            {columns.map((column) => (
              <Table.Th key={column.key}>{column.title}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
