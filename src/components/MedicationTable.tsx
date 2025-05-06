"use client";
import "@mantine/core/styles.css";
import { Checkbox, Table, Tooltip } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoPlus } from "react-icons/go";

type Field = {
  id: number;
  label: string;
  value: string;
  CRA: boolean;
  DM: boolean;
  query?: boolean;
  error?: boolean;
};

const data: Field[] = [
  {
    id: 1,
    label: "Were any medications/therapies taken?",
    value: "Yes",
    CRA: true,
    DM: false,
  },
  {
    id: 2,
    label: "What was the medication/treatment/therapy name?",
    value: "Ibuprofen",
    CRA: false,
    DM: false,
  },
  {
    id: 3,
    label: "What was the individual dose of the medication?",
    value: "500",
    CRA: true,
    DM: true,
  },
  {
    id: 4,
    label: "What was the unit of the medication dose?",
    value: "mg",
    CRA: false,
    DM: true,
    query: true,
  },
  {
    id: 5,
    label: "Is the medication ongoing?",
    value: "No",
    CRA: true,
    DM: false,
  },
];

export default function MedicationTable() {
  const [tableData, setTableData] = useState(data);
  const router = useRouter();

  // Handle checkbox change
  const handleCraChange = (id: number) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, CRA: !item.CRA } : item
      )
    );
  };

  const handleDmChange = (id: number) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, DM: !item.DM } : item
      )
    );
  };

  const rows = tableData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.label}</Table.Td>
      <Table.Td>{element.value}</Table.Td>
      <Table.Td>
        <Checkbox
          checked={element.CRA}
          onChange={() => handleCraChange(element.id)}
        />
      </Table.Td>
      <Table.Td>
        <Checkbox
          checked={element.DM}
          onChange={() => handleDmChange(element.id)}
        />
      </Table.Td>
      <Table.Td>
        <Tooltip label="Create Query">
          <button
            onClick={() =>
              router.push(
                `/create/${element.id}?label=${encodeURIComponent(
                  element.label
                )}`
              )
            }
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GoPlus />
          </button>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  ));

  const tableHeaders = (
    <Table.Tr>
      <Table.Th>Field Data</Table.Th>
      <Table.Th></Table.Th>
      <Table.Th>CRA</Table.Th>
      <Table.Th>DM</Table.Th>
      <Table.Th>Queries</Table.Th>
    </Table.Tr>
  );
  return (
    <Table striped highlightOnHover captionSide="top">
      <Table.Caption>Vial Form</Table.Caption>
      <Table.Thead>{tableHeaders}</Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
