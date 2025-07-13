"use client";

import AuthProvider from "@/context/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            style: {
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "16px",
              paddingBottom: "16px",
              background: "#161D2F",
              color: "#FFF",
              maxWidth: "80%",
            },
          }}
        />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
