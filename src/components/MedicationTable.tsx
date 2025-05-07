"use client";
import "@mantine/core/styles.css";
import { Center, Checkbox, Table, Tooltip, Box } from "@mantine/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoPlus } from "react-icons/go";
import { FaQuestionCircle, FaCheckCircle } from "react-icons/fa";
import { useApi } from "@/hooks/useApi";

type FormData = {
  id: string;
  question: string;
  answer: string;
  cra: boolean;
  dm: boolean;
  query?: {
    id: string;
    title: string;
    description: string;
    status: "OPEN" | "RESOLVED";
    createdAt: string;
    updatedAt: string;
  };
};

export default function MedicationTable() {
  const [tableData, setTableData] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { getFormData, updateFormData } = useApi();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFormData();
        setTableData(response.data.formData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
                  )}&query=${encodeURIComponent(element.query.status)}`
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
                  )}&query=${encodeURIComponent(element.query.status)}`
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
