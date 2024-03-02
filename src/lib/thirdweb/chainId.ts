import { defineChain } from "thirdweb";

export const BNBMainnet = defineChain({
  id: 56,
  rpc: "https://bsc-dataseed.binance.org/",
});

export const BNBTestnet = defineChain({
  id: 97,
  rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
});

export const GreenfieldMainnet = defineChain({
  id: 1017,
  rpc: "https://greenfield-chain-us.bnbchain.org",
});

export const GreenfieldTestnet = defineChain({
  id: 5600,
  rpc: "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
});
