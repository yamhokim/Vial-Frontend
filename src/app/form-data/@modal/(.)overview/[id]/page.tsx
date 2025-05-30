"use client";

import React, { useState } from "react";
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
import { FaTrash } from "react-icons/fa";
import { useTable } from "@/context/TableContext";
import { useApi } from "@/hooks/useApi";

// Intercepts the overview page and displays the query in a modal.
export default function OverviewQueryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const label = searchParams.get("label");
  const formDataId = params.id as string;
  const { tableData, refreshData } = useTable();
  const { updateQuery, deleteQuery } = useApi();
  const [isResolving, setIsResolving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
        {query?.status === "RESOLVED"
          ? `Resolved: ${new Date(query.updatedAt).toLocaleDateString()}`
          : `Created: ${new Date(query?.createdAt || "").toLocaleDateString()}`}
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
          {query?.status === "RESOLVED" ? "Resolved On" : "Created On"}
        </Text>
      </Table.Td>
    </Table.Tr>
  );

  const handleClose = () => {
    router.back();
  };

  const handleResolve = async () => {
    if (!query?.id) return;

    setIsResolving(true);
    try {
      await updateQuery(query.id, { status: "RESOLVED" });
      await refreshData();
      handleClose();
    } catch (error) {
      console.error("Error resolving query:", error);
    } finally {
      setIsResolving(false);
    }
  };

  const handleDelete = async () => {
    if (!query?.id) return;

    setIsDeleting(true);
    try {
      await deleteQuery(query.id);
      await refreshData();
      router.back();
    } catch (error) {
      console.error("Error deleting query:", error);
    } finally {
      setIsDeleting(false);
    }
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
            onClick={handleResolve}
            loading={isResolving}
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
            {query?.status === "RESOLVED"
              ? `Resolved: ${new Date(query.updatedAt).toLocaleString()}`
              : `Created: ${new Date(query?.createdAt || "").toLocaleString()}`}
          </Text>
        </Group>
        <Text mt="sm" ml="xs">
          {query?.description || "No description available"}
        </Text>
      </Box>

      <Group justify="flex-end" mt="lg">
        <Button
          color="red"
          variant="light"
          leftSection={<FaTrash />}
          onClick={handleDelete}
          loading={isDeleting}
        >
          Delete Query
        </Button>
      </Group>
    </Modal>
  );
}
