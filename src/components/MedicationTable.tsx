"use client";
import "@mantine/core/styles.css";
import { Center, Checkbox, Table, Tooltip, Box } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoPlus } from "react-icons/go";
import { FaQuestionCircle, FaCheckCircle } from "react-icons/fa";

type QueryStatus = "none" | "opened" | "resolved";

type Field = {
  id: number;
  label: string;
  value: string;
  CRA: boolean;
  DM: boolean;
  query: QueryStatus;
  error?: boolean;
};

const data: Field[] = [
  {
    id: 1,
    label: "Were any medications/therapies taken?",
    value: "Yes",
    CRA: true,
    DM: false,
    query: "none",
  },
  {
    id: 2,
    label: "What was the medication/treatment/therapy name?",
    value: "Ibuprofen",
    CRA: false,
    DM: false,
    query: "opened",
  },
  {
    id: 3,
    label: "What was the individual dose of the medication?",
    value: "500",
    CRA: true,
    DM: true,
    query: "resolved",
  },
  {
    id: 4,
    label: "What was the unit of the medication dose?",
    value: "mg",
    CRA: false,
    DM: true,
    query: "none",
  },
  {
    id: 5,
    label: "Is the medication ongoing?",
    value: "No",
    CRA: true,
    DM: false,
    query: "none",
  },
  {
    id: 6,
    label: "Is the medication animal safe?",
    value: "No",
    CRA: true,
    DM: false,
    query: "none",
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
      <Table.Td align="center">
        <Checkbox
          checked={element.CRA}
          onChange={() => handleCraChange(element.id)}
        />
      </Table.Td>
      <Table.Td align="center">
        <Checkbox
          checked={element.DM}
          onChange={() => handleDmChange(element.id)}
        />
      </Table.Td>
      <Table.Td
        bg={
          element.query === "opened"
            ? "#fff5f5"
            : element.query === "resolved"
            ? "#f5fff5"
            : ""
        }
        align="center"
      >
        {element.query === "none" && (
          <Tooltip label="Create Query">
            <button
              onClick={() =>
                router.push(
                  `/form-data/create/${element.id}?label=${encodeURIComponent(
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
        )}
        {element.query === "opened" && (
          <Tooltip label="View Query">
            <button
              onClick={() =>
                router.push(
                  `/form-data/overview/${element.id}?label=${encodeURIComponent(
                    element.label
                  )}&query=${encodeURIComponent(element.query)}`
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
              <FaQuestionCircle color="red" />
            </button>
          </Tooltip>
        )}
        {element.query === "resolved" && (
          <Tooltip label="Query Resolved">
            <button
              onClick={() =>
                router.push(
                  `/form-data/overview/${element.id}?label=${encodeURIComponent(
                    element.label
                  )}&query=${encodeURIComponent(element.query)}`
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
              <FaCheckCircle color="green" />
            </button>
          </Tooltip>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  const tableHeaders = (
    <Table.Tr>
      <Table.Th>Fields</Table.Th>
      <Table.Th></Table.Th>
      <Table.Th>CRA</Table.Th>
      <Table.Th>DM</Table.Th>
      <Table.Th>Queries</Table.Th>
    </Table.Tr>
  );
  return (
    <Box p="lg">
      <Table
        striped
        withTableBorder
        highlightOnHover
        verticalSpacing="md"
        mt="lg"
        mb="lg"
      >
        <Table.Thead>{tableHeaders}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
}
