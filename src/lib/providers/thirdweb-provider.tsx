"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";

const activeChain = "ethereum";

export default function ThirdWebProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      authConfig={{
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
        authUrl: "/api/auth",
      }}
    >
      {children}
    </ThirdwebProvider>
  );
}
