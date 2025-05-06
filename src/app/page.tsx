"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <h1>Welcome to Vial</h1>;
      <Button onClick={() => router.push(`/form-data`)}>Go to Table</Button>
    </>
  );
}
