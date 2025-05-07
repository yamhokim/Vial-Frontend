"use client";

import React from "react";
import { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Modal, Textarea, Button, Group } from "@mantine/core";
import { useApi } from "@/hooks/useApi";
import { useTable } from "@/context/TableContext";

// Intercepts the create page and displays the query creation page in a modal
export default function ModalCreateQueryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const label = searchParams.get("label");
  const formDataId = params.id as string;
  const [queryText, setQueryText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createQuery } = useApi();
  const { refreshData } = useTable();

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = async () => {
    // Invalid URL case, just return
    if (!formDataId || !label) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createQuery({
        title: label,
        description: queryText.trim(),
        formDataId: formDataId,
      });

      // Refresh the table data
      await refreshData();

      handleClose();
    } catch (err) {
      console.error(`Error Creating Query: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      opened={true}
      onClose={() => router.back()}
      title={`Create a Query | ${label}`}
      centered
      size="lg"
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
      <Textarea
        value={queryText}
        onChange={(e) => setQueryText(e.currentTarget.value)}
        placeholder="Add a new remark"
        minRows={8}
        maxRows={8}
        autosize
        styles={{
          input: {
            overflowY: "auto",
          },
        }}
        mt="lg"
        mb="xl"
      />
      <Group mt="xl" justify="center">
        <Button onClick={handleSubmit} w="40%" loading={isSubmitting}>
          Create
        </Button>
      </Group>
    </Modal>
  );
}
