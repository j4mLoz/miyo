"use client";

import { ToastProvider, useToast } from "./useToast";
import { Toast } from "./Toast";

export function ToastProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <InnerToast>{children}</InnerToast>
    </ToastProvider>
  );
}

function InnerToast({ children }: { children: React.ReactNode }) {
  const { message } = useToast();

  return (
    <>
      {children}
      <Toast message={message} />
    </>
  );
}
