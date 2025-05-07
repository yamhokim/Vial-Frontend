"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";

type FormData = {
  id: string;
  question: string;
  answer: string;
  cra: boolean;
  dm: boolean;
  query?: {
    id: string;
    title: string;
    description: string;
    status: "OPEN" | "RESOLVED";
    createdAt: string;
    updatedAt: string;
  };
};

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
