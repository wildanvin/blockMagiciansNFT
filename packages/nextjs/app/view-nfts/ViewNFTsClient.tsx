"use client";

import type { NextPage } from "next";
import { useMemo } from "react";
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


  const imageSrc = useMemo(() => {
    if (!data) return "";
    try {
      const json = atob(data.replace("data:application/json;base64,", ""));
      const meta = JSON.parse(json);
      return meta.image as string;

    } catch (err) {
      console.error("Failed to decode tokenURI", err);
      return "";
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center">

      {imageSrc ? (
        <img src={imageSrc} alt={`BlockMagician ${id}`} className="w-48 h-auto" />

      ) : (
        <span>Loading...</span>
      )}
      <span className="mt-2 font-semibold">#{id}</span>
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
    for (let i = minted; i > 0 && arr.length < 30; i--) {
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
