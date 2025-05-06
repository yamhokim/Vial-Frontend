"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Modal,
  Button,
  Group,
  Box,
  Badge,
  Text,
  Table,
  Flex,
} from "@mantine/core";
import { IoIosCheckmark } from "react-icons/io";

export default function CreateQueryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const label = searchParams.get("label");
  const queryState = searchParams.get("query");

  // Determine styles based on queryState value
  let statusColor = "gray";
  let statusLabel = "None";
  let bgColor = "#f5f5f5";
  let buttonColor = "gray";
  let showResolve = false;

  if (queryState === "opened") {
    statusColor = "red";
    statusLabel = "Open";
    bgColor = "#fff5f5";
    buttonColor = "teal";
    showResolve = true;
  } else if (queryState === "resolved") {
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
      <Table.Td>Sew+Dm@Vial.com</Table.Td>
      <Table.Td>June 1, 2025</Table.Td>
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
      <Flex
        gap="xl"
        align="center"
        wrap="nowrap"
        style={{
          borderRadius: "var(--mantine-radius-sm)",
          background: bgColor,
        }}
        p="sm"
      >
        <Table withColumnBorders withRowBorders={false}>
          <Table.Thead>{tableHeaders}</Table.Thead>
          <Table.Tbody>{row}</Table.Tbody>
        </Table>
        {showResolve && (
          <Button
            color={buttonColor}
            variant="filled"
            style={{ flexShrink: 0 }}
          >
            <IoIosCheckmark /> Resolve
          </Button>
        )}
      </Flex>

      <Box mt="lg">
        <Group justify="space-between">
          <Badge color="gray" variant="light">
            swe+dm@vial.com
          </Badge>
          <Text size="sm" color="dimmed" ml="xs">
            January 06 2025 - 14:53
          </Text>
        </Group>
        <Text mt="sm" ml="xs">
          test
        </Text>
      </Box>
    </Modal>
  );
}
