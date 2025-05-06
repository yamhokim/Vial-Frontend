"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Modal, Textarea, Button } from "@mantine/core";
import { useState } from "react";

export default function CreateQueryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const label = searchParams.get("label");
  const [queryText, setQueryText] = useState("");

  return (
    <Modal
      opened={true}
      onClose={() => router.back()}
      title={`Create a Query | ${label}`}
    >
      <Textarea
        label="Query"
        value={queryText}
        onChange={(e) => setQueryText(e.currentTarget.value)}
      />
      <Button>Cancel</Button>
      <Button>Submit</Button>
    </Modal>
  );
}
