"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";

// The FormData type represents the structure of the form-data table in the database. Used to enforce type safety
type FormData = {
  id: string;
  question: string;
  answer: string;
  query?: {
    id: string;
    title: string;
    description: string;
    status: "OPEN" | "RESOLVED";
    createdAt: string;
    updatedAt: string;
  };
};

/**
 * Originally I had states on each component that needed the data, but I decided to create a context for two main reasons:
 * 1. React contexts provide a way to share data across different components
 * 2. Contexts provide a very consistent way to refresh data after mutations, making the UI more responsive to changes
 */
type TableContextType = {
  tableData: FormData[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [tableData, setTableData] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getFormData } = useApi();

  const refreshData = async () => {
    try {
      const response = await getFormData();
      setTableData(response.data.formData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <TableContext.Provider value={{ tableData, isLoading, refreshData }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
}
