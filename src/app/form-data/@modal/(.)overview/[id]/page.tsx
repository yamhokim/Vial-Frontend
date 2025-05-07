"use client";

import React from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import {
  Modal,
  Button,
  Group,
  Box,
  Badge,
  Text,
  Table,
  Flex,
  Divider,
} from "@mantine/core";
import { IoIosCheckmark } from "react-icons/io";
import { useTable } from "@/context/TableContext";

export default function OverviewQueryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const label = searchParams.get("label");
  const formDataId = params.id as string;
  const { tableData } = useTable();

  // Find the form data entry that matches our ID
  const formDataEntry = tableData.find((entry) => entry.id === formDataId);
  const query = formDataEntry?.query;

  // Determine styles based on query status
  let statusColor = "gray";
  let statusLabel = "None";
  let bgColor = "#f5f5f5";
  let buttonColor = "gray";
  let showResolve = false;

  if (query?.status === "OPEN") {
    statusColor = "red";
    statusLabel = "Open";
    bgColor = "#fff5f5";
    buttonColor = "teal";
    showResolve = true;
  } else if (query?.status === "RESOLVED") {
    statusColor = "green";
    statusLabel = "Resolved";
    bgColor = "#f5fff5";
    buttonColor = "gray";
    showResolve = false;
  }

  const row = (
    <Table.Tr>
      <Table.Td>
        <Badge color={statusColor} variant="filled">
          {statusLabel}
        </Badge>
      </Table.Td>
      <Table.Td>User</Table.Td>
      <Table.Td>
        {query ? new Date(query.createdAt).toLocaleDateString() : "N/A"}
      </Table.Td>
    </Table.Tr>
  );

  const tableHeaders = (
    <Table.Tr>
      <Table.Td>
        <Text color="dimmed" size="sm">
          Query Status
        </Text>
      </Table.Td>
      <Table.Td>
        <Text color="dimmed" size="sm">
          Created By:
        </Text>
      </Table.Td>
      <Table.Td>
        <Text color="dimmed" size="sm">
          Created On
        </Text>
      </Table.Td>
    </Table.Tr>
  );

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Need to add code to handle the submission of data
    handleClose();
  };

  return (
    <Modal
      opened={true}
      onClose={() => router.back()}
      title={`Query | ${label}`}
      centered
      size="xl"
      styles={{
        content: {
          minHeight: "200px",
        },
        title: {
          fontWeight: 700,
          fontSize: 18,
        },
      }}
    >
      <Divider size="sm"></Divider>
      <Flex
        gap="xl"
        align="center"
        wrap="nowrap"
        style={{
          borderRadius: "var(--mantine-radius-sm)",
          background: bgColor,
        }}
        p="sm"
        mt="lg"
        mb="lg"
      >
        <Table withColumnBorders withRowBorders={false}>
          <Table.Thead>{tableHeaders}</Table.Thead>
          <Table.Tbody>{row}</Table.Tbody>
        </Table>
        {showResolve ? (
          <Button
            color={buttonColor}
            variant="filled"
            style={{ flexShrink: 0, minWidth: 100 }}
          >
            <IoIosCheckmark /> Resolve
          </Button>
        ) : (
          <div style={{ minWidth: 100 }} />
        )}
      </Flex>

      <Box
        mt="lg"
        style={{
          borderRadius: "var(--mantine-radius-sm)",
          background: "#f8f9fa",
        }}
        p="sm"
      >
        <Group justify="space-between">
          <Badge color="gray" variant="light">
            User
          </Badge>
          <Text size="sm" color="dimmed" ml="xs">
            {query ? new Date(query.createdAt).toLocaleString() : "N/A"}
          </Text>
        </Group>
        <Text mt="sm" ml="xs">
          {query?.description || "No description available"}
        </Text>
      </Box>
    </Modal>
  );
}
