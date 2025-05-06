"use client";

import React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Modal, Textarea, Button, Group } from "@mantine/core";

export default function ModalCreateQueryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const label = searchParams.get("label");
  const [queryText, setQueryText] = useState("");

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
      title={`Create a Query | ${label}`}
      centered
      size="lg"
      styles={{
        content: {
          minHeight: "200px",
        },
        title: {
          fontWeight: 700,
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
      />
      <Group mt="md">
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </Group>
    </Modal>
  );
}
