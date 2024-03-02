import { getOffchainAuthKeys } from "@/utils/offchainAuth";
import { client, selectSp } from "@/client";

export const createBucketTx = async (
  address: string,
  connector: any,
  bucketName: string
) => {
  const provider = await connector?.getProvider();
  console.log(provider);
  // const offChainData = await getOffchainAuthKeys(address, provider);
  // const spInfo = await selectSp();
  // console.log("spInfo", spInfo);
  // if (!offChainData) {
  //   alert("No offchain, please create offchain pairs first");
  //   return;
  // }
  // try {
  //   const createBucketTx = await client.bucket.createBucket(
  //     {
  //       bucketName: bucketName,
  //       creator: address,
  //       visibility: "VISIBILITY_TYPE_PUBLIC_READ",
  //       chargedReadQuota: "0",
  //       spInfo: {
  //         primarySpAddress: spInfo.primarySpAddress,
  //       },
  //       paymentAddress: address,
  //     },
  //     {
  //       type: "EDDSA",
  //       domain: window.location.origin,
  //       seed: offChainData.seedString,
  //       address,
  //     }
  //   );
  //   const simulateInfo = await createBucketTx.simulate({
  //     denom: "BNB",
  //   });
  //   console.log("simulateInfo", simulateInfo);
  //   const res = await createBucketTx.broadcast({
  //     denom: "BNB",
  //     gasLimit: Number(simulateInfo?.gasLimit),
  //     gasPrice: simulateInfo?.gasPrice || "5000000000",
  //     payer: address,
  //     granter: "",
  //   });
  //   if (res.code === 0) {
  //     alert("success");
  //   }
  // } catch (err) {
  //   console.log(typeof err);
  //   if (err instanceof Error) {
  //     alert(err.message);
  //   }
  //   if (err && typeof err === "object") {
  //     alert(JSON.stringify(err));
  //   }
  // }
};
