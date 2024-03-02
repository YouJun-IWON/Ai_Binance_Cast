import { chains, publicClient, webSocketPublicClient } from "@/config/wallet";

import { createConfig } from "wagmi";

export const wagmiConfig = createConfig({
  autoConnect: true,
  webSocketPublicClient,
  publicClient,
});
