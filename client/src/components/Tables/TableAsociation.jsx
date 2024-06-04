/* eslint-disable react/prop-types */
import { Table, Checkbox } from "@mantine/core";
import { useState } from "react";

export const TableAsociation = ({ data, columns }) => {
  const [selectedRows, setSelectedRows] = useState([]);

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
          checked={selectedRows.includes(item.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, item.id]
                : selectedRows.filter(
                    (id) => id !== item.id
                  )
            )
          }
        />
      </Table.Td>

      {columns.map((column) => (
        <Table.Td key={column.key}>{item[column.key]}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer>
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
