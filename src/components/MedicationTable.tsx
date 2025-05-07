"use client";
import "@mantine/core/styles.css";
import { Center, Table, Tooltip, Box } from "@mantine/core";
import { useRouter } from "next/navigation";
import { GoPlus } from "react-icons/go";
import { FaQuestionCircle, FaCheckCircle } from "react-icons/fa";
import { useTable } from "@/context/TableContext";

// MedicationTable component displays form data in a tabular format with query management.
export default function MedicationTable() {
  const router = useRouter();
  const { tableData, isLoading } = useTable();

  const rows = tableData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.question}</Table.Td>
      <Table.Td>{element.answer}</Table.Td>
      <Table.Td
        bg={
          element.query?.status === "OPEN"
            ? "#fff5f5"
            : element.query?.status === "RESOLVED"
            ? "#f5fff5"
            : ""
        }
        align="center"
      >
        {!element.query && (
          <Tooltip label="Create Query">
            <button
              onClick={() =>
                router.push(
                  `/form-data/create/${element.id}?label=${encodeURIComponent(
                    element.question
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
        {element.query?.status === "OPEN" && (
          <Tooltip label="View Query">
            <button
              onClick={() =>
                router.push(
                  `/form-data/overview/${element.id}?label=${encodeURIComponent(
                    element.question
                  )}&query=${encodeURIComponent(element.query?.status || "")}`
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
        {element.query?.status === "RESOLVED" && (
          <Tooltip label="Query Resolved">
            <button
              onClick={() =>
                router.push(
                  `/form-data/overview/${element.id}?label=${encodeURIComponent(
                    element.question
                  )}&query=${encodeURIComponent(element.query?.status || "")}`
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
      <Table.Th>Answer</Table.Th>
      <Table.Th>Queries</Table.Th>
    </Table.Tr>
  );

  if (isLoading) {
    return (
      <Box p="lg">
        <Center>Loading...</Center>
      </Box>
    );
  }

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
