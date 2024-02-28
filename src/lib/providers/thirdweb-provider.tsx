"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { client } from "@/utils/createThirdwebClient";

const activeChain = "ethereum";

export default function ThirdWebProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      client={client}
      // activeChain={activeChain}
      // authConfig={{
      //   domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
      //   authUrl: "/api/auth",
      // }}
    >
      {children}
    </ThirdwebProvider>
  );
}
