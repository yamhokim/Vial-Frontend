"use client";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Box,
  Group,
} from "@mantine/core";
import { TableProvider } from "@/context/TableContext";
import React from "react";
import { FaVial } from "react-icons/fa";

/**
 * RootLayout component serves as the main layout wrapper for the entire application.
 * I also include styling and theming through MantineProvider
 * TableProvider is used here to enable sharing of table data across components
 */
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <TableProvider>
            <Box p="md" bg="#f8f9fa">
              <Group justify="space-between">
                <h1 style={{ margin: 0, fontSize: 24 }}>
                  <FaVial /> Vial Queries
                </h1>
                <h3>Welcome, User</h3>
              </Group>
            </Box>
            {children}
            {modal}
          </TableProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
