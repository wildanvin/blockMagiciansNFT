"use client";

import type { NextPage } from "next";
import { useMemo } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Card displaying a single NFT
interface NFTCardProps {
  id: number;
}

const NFTCard = ({ id }: NFTCardProps) => {
  const { data } = useScaffoldReadContract({
    contractName: "BlockMagicians",
    functionName: "tokenURI",
    args: [BigInt(id)],
  });

  const svgContent = useMemo(() => {
    if (!data) return "";
    try {
      // tokenURI is returned as a base64 encoded JSON string
      const json = atob(data.replace("data:application/json;base64,", ""));
      // protocol value is not quoted in the JSON, fix it before parsing
      const fixed = json.replace(/"value":\s*([A-Za-z]+)/g, '"value": "$1"');
      const meta = JSON.parse(fixed);
      const image = meta.image as string;
      // decode the base64 encoded svg image
      return atob((image as string).replace("data:image/svg+xml;base64,", ""));
    } catch (err) {
      console.error("Failed to decode tokenURI", err);
      return "";
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      {svgContent ? (
        <div
          className="w-48 h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
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
