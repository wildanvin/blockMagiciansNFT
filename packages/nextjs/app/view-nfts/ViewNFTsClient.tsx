"use client";

import { useMemo } from "react";
import type { NextPage } from "next";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";

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
      return JSON.parse(json) as { image: string; owner: string; description: string };
    } catch (err) {
      console.error("Failed to decode tokenURI", err);
      return null;
    }
  }, [data]);

  const imageSrc = meta?.image ?? "";

  return (
    <div className="flex flex-col items-center">
      {imageSrc ? <img src={imageSrc} alt={`BlockMagician ${id}`} className="w-48 h-auto" /> : <span>Loading...</span>}
      <span className="mt-2 font-semibold">#{id}</span>
      {meta?.owner && (
        <div className="mt-1">
          <Address address={meta.owner} />
        </div>
      )}
      {meta?.description && (
        <p className="text-center text-sm mt-1">{meta.description}</p>
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
      <h1 className="text-3xl font-bold text-center mb-6">Latest BlockMagicians</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ids.map(id => (
          <NFTCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default ViewNFTsClient;
