"use client";

import { useMemo } from "react";
import { descriptions, protocols } from "../page";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Reuse NFTCard and logic from the previous client page

type NFTCardProps = {
  id: number;
};

const NFTCard = ({ id }: NFTCardProps) => {
  const { data } = useScaffoldReadContract({
    contractName: "BlockMagicians",
    functionName: "tokenURI",
    args: [BigInt(id)],
  });

  const meta = useMemo(() => {
    if (!data) return null;
    try {
      const json = atob(data.replace("data:application/json;base64,", ""));
      return JSON.parse(json) as {
        image: string;
        owner: string;
        description: string;
        attributes?: { trait_type: string; value: string }[];
      };
    } catch (err) {
      console.error("Failed to decode tokenURI", err);
      return null;
    }
  }, [data]);

  const imageSrc = meta?.image ?? "";
  const protocol = useMemo(() => {
    const attr = meta?.attributes?.find(a => a.trait_type === "protocol");
    if (attr) return attr.value as string;
    const match = meta?.description?.match(/uses ([^ ]+) block/);
    return match?.[1];
  }, [meta]);

  const protocolIndex = protocol ? protocols.indexOf(protocol) : -1;

  return (
    <div className="flex flex-col items-center group">
      {imageSrc ? (
        <img src={imageSrc} alt={`BlockMagician ${id}`} className="w-48 h-auto" />
      ) : (
        <span className="mt-2 font-semibold">Loading...</span>
      )}
      <span className="mt-2 font-semibold">#{id}</span>
      <span className="mt-1 font-medium">{protocol}</span>

      {meta?.owner && (
        <div className="mt-1 font-medium text-center">
          Owner: <Address address={meta.owner} />
        </div>
      )}
      {protocol && (
        <>
          {protocolIndex >= 0 && (
            <p className="text-center text-sm mt-1 hidden group-hover:block">
              {protocol}
              {descriptions[protocolIndex]}
            </p>
          )}
        </>
      )}
    </div>
  );
};

const ViewNFTsClient: NextPage = () => {
  const { data: healthData } = useScaffoldReadContract({
    contractName: "BlockMagicians",
    functionName: "molochHealth",
  });

  const maxHealth = 1000;
  const minted = healthData ? maxHealth - Number(healthData) : 0;
  const ids = useMemo(() => {
    const arr: number[] = [];
    for (let i = minted; i > 0 && arr.length < 4; i--) {
      arr.push(i);
    }
    return arr;
  }, [minted]);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Latest Block Magicians</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ids.map(id => (
          <NFTCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default ViewNFTsClient;
