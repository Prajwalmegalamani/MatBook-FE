import { AuthProvider } from "@/hooks/use-auth";
import { ToastProvider } from "@/hooks/use-toast";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen">
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </div>
  );
}
