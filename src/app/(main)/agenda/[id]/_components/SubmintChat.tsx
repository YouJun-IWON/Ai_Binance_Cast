import { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { example } from "../../example..json";
import { getOffchainAuthKeys } from "@/utils/offchainAuth";
import { ReedSolomon } from "@bnb-chain/reed-solomon";
import { client, selectSp } from "@/client";
import { MessagesContext } from "@/context/messages";

const SubmitChat = ({ agenda }: any) => {
  const { address, connector } = useAccount();
  const bucketName = String(agenda.subject) + String(address);
  const [file, setFile] = useState<File | null>(null);
  const { messages } = useContext(MessagesContext);
  console.log(messages);
  const [info, setInfo] = useState<{
    bucketName: string;
    objectName: string;
  }>({
    bucketName: "",
    objectName: "",
  });

  const [txnHash, setTxnHash] = useState("");
  return (
    <div>
      <p>{bucketName}</p>
      <p>{address}</p>
      <>
        <div className="box">
          <div className="field">
            <button
              className={"button is-primary"}
              onClick={async () => {
                const jsonObject = example;
                // JSON 객체를 문자열로 변환
                const jsonString = JSON.stringify(jsonObject);
                // 문자열을 Blob으로 변환
                const blob = new Blob([jsonString], {
                  type: "application/json",
                });
                // Blob을 File 객체로 변환
                const result = new File([blob], "example.json", {
                  type: "application/json",
                });
                setFile(result);
                alert("File Created");
              }}
            >
              Create File
            </button>
          </div>
        </div>

        <div className="box">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Bucket</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={info.bucketName}
                    placeholder="bucket name"
                    onChange={(e) => {
                      setInfo({ ...info, bucketName: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <button
              className={"button is-primary"}
              onClick={async () => {
                if (!address) return;

                const spInfo = await selectSp();
                console.log("spInfo", spInfo);

                const provider = await connector?.getProvider();
                console.log(provider);
                const offChainData = await getOffchainAuthKeys(
                  address,
                  provider
                );
                if (!offChainData) {
                  alert("No offchain, please create offchain pairs first");
                  return;
                }

                try {
                  const createBucketTx = await client.bucket.createBucket(
                    {
                      bucketName: info.bucketName,
                      creator: address,
                      visibility: "VISIBILITY_TYPE_PUBLIC_READ",
                      chargedReadQuota: "0",
                      spInfo: {
                        primarySpAddress: spInfo.primarySpAddress,
                      },
                      paymentAddress: address,
                    },
                    {
                      type: "EDDSA",
                      domain: window.location.origin,
                      seed: offChainData.seedString,
                      address,
                    }
                  );

                  const simulateInfo = await createBucketTx.simulate({
                    denom: "BNB",
                  });

                  console.log("simulateInfo", simulateInfo);

                  const res = await createBucketTx.broadcast({
                    denom: "BNB",
                    gasLimit: Number(simulateInfo?.gasLimit),
                    gasPrice: simulateInfo?.gasPrice || "5000000000",
                    payer: address,
                    granter: "",
                  });

                  if (res.code === 0) {
                    alert("success");
                  }
                } catch (err) {
                  console.log(typeof err);
                  if (err instanceof Error) {
                    alert(err.message);
                  }
                  if (err && typeof err === "object") {
                    alert(JSON.stringify(err));
                  }
                }
              }}
            >
              Create Bucket Tx
            </button>
          </div>
        </div>

        <div className="box">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Object</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={info.objectName}
                    placeholder="object name"
                    onChange={(e) => {
                      setInfo({ ...info, objectName: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* create object */}
          <div className="field">
            <button
              className="button is-primary"
              onClick={async () => {
                if (!address || !file) return;

                const spInfo = await selectSp();
                console.log("spInfo", spInfo);

                const provider = await connector?.getProvider();
                const offChainData = await getOffchainAuthKeys(
                  address,
                  provider
                );
                if (!offChainData) {
                  alert("No offchain, please create offchain pairs first");
                  return;
                }

                const rs = new ReedSolomon();
                const fileBytes = await file.arrayBuffer();
                const expectCheckSums = rs.encode(new Uint8Array(fileBytes));

                try {
                  const createObjectTx = await client.object.createObject(
                    {
                      bucketName: info.bucketName,
                      objectName: info.objectName,
                      creator: address,
                      visibility: "VISIBILITY_TYPE_PRIVATE",
                      fileType: file.type,
                      redundancyType: "REDUNDANCY_EC_TYPE",
                      contentLength: fileBytes.byteLength,
                      expectCheckSums: expectCheckSums,
                    },
                    {
                      type: "EDDSA",
                      domain: window.location.origin,
                      seed: offChainData.seedString,
                      address,
                    }
                  );

                  const simulateInfo = await createObjectTx.simulate({
                    denom: "BNB",
                  });

                  console.log("simulateInfo", simulateInfo);

                  const res = await createObjectTx.broadcast({
                    denom: "BNB",
                    gasLimit: Number(simulateInfo?.gasLimit),
                    gasPrice: simulateInfo?.gasPrice || "5000000000",
                    payer: address,
                    granter: "",
                  });

                  if (res.code === 0) {
                    setTxnHash(res.transactionHash);
                    alert("create object success");
                  }
                } catch (err) {
                  console.log(typeof err);
                  if (err instanceof Error) {
                    alert(err.message);
                  }
                  if (err && typeof err === "object") {
                    alert(JSON.stringify(err));
                  }
                }

                {
                  /* upload */
                }
                const uploadRes = await client.object.uploadObject(
                  {
                    bucketName: info.bucketName,
                    objectName: info.objectName,
                    body: file,
                    txnHash: txnHash,
                  },
                  {
                    type: "EDDSA",
                    domain: window.location.origin,
                    seed: offChainData.seedString,
                    address,
                  }
                );

                if (uploadRes.code === 0) {
                  alert("success");
                }
              }}
            >
              Upload
            </button>
          </div>

          {/* Download */}
          <div className="field">
            <button
              className="button is-primary"
              onClick={async () => {
                if (!address) return;

                const spInfo = await selectSp();
                console.log("spInfo", spInfo);

                const provider = await connector?.getProvider();
                const offChainData = await getOffchainAuthKeys(
                  address,
                  provider
                );
                if (!offChainData) {
                  alert("No offchain, please create offchain pairs first");
                  return;
                }

                const res = await client.object.downloadFile(
                  {
                    bucketName: info.bucketName,
                    objectName: info.objectName,
                  },
                  {
                    type: "EDDSA",
                    address,
                    domain: window.location.origin,
                    seed: offChainData.seedString,
                  }
                );

                console.log(res);
              }}
            >
              Download
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default SubmitChat;
