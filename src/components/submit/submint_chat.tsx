"use client";

import { client, selectSp } from "@/client";
import { useState, useEffect } from "react";
import { ReedSolomon } from "@bnb-chain/reed-solomon";
import { connectToMetamask } from "@/lib/thirdweb/connectWallet/connectWallet";
import { GreenfieldTestnet } from "@/lib/thirdweb/chainId";
import { createBucketTx } from "@/utils/createBucketTx";
import { useAccount } from "wagmi";

const SubmitChat = ({ agenda }: any) => {
  const { address, connector } = useAccount();
  console.log(connector);
  const bucketName = agenda.subject;
  // const provider = GreenfieldTestnet.rpc;

  const getBucketTx = async () => {
    await createBucketTx(
      "0x5065Fd0b55a7eF076306b25Ef4aC7E34efDBBC2C",
      connector,
      bucketName
    );
  };
  // getBucketTx();

  const [info, setInfo] = useState<{
    objectName: string;
    file: File | null;
  }>({
    objectName: "",
    file: null,
  });
  const [txnHash, setTxnHash] = useState("");
  return (
    <div>
      <p>{bucketName}</p>
      <p>{address}</p>
      {/* <p>{provider}</p> */}
    </div>
  );
};

export default SubmitChat;
