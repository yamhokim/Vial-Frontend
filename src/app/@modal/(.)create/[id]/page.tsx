"use client";

import React from "react";
import { Modal } from "./modal";
import { useSearchParams } from "next/navigation";

export default function ModalCreateQueryPage() {
  const searchParams = useSearchParams();
  const label = searchParams.get("label");
  return <Modal>{label}</Modal>;
}
