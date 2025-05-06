"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Stack,
} from "@mantine/core";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Logging in as ${email}`);
    router.push(`/form-data`);
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        shadow="md"
        padding="xl"
        radius="md"
        withBorder
        style={{
          minWidth: 400,
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleLogin}>
          <Stack>
            <Title order={2} align="center" mb="md">
              Welcome to Vial
            </Title>
            <TextInput
              label="Username"
              placeholder="Enter Username"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
            <Button type="submit" fullWidth mt="lg">
              Login
            </Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
}
