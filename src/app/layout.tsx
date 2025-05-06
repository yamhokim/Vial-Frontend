"use client";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Box,
  Group,
} from "@mantine/core";
import React from "react";
import { FaVial } from "react-icons/fa";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Box p="md" bg="#f8f9fa">
            <Group justify="space-between">
              <h1 style={{ margin: 0, fontSize: 24 }}>
                <FaVial /> Vial Queries
              </h1>
              <h3>Welcome, User</h3>
            </Group>
          </Box>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
