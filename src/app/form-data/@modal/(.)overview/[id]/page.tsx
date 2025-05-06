"use client";

import React from "react";
import { useState } from "react";
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
  const [queryText, setQueryText] = useState("");

  const row = (
    <Table.Tr>
      <Table.Td>
        <Badge color="red" variant="filled">
          Open
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
          background: "#fff5f5",
        }}
        p="sm"
      >
        <Table withColumnBorders withRowBorders={false}>
          <Table.Thead>{tableHeaders}</Table.Thead>
          <Table.Tbody>{row}</Table.Tbody>
        </Table>
        <Button color="teal" variant="filled" style={{ flexShrink: 0 }}>
          <IoIosCheckmark /> Resolve
        </Button>
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
