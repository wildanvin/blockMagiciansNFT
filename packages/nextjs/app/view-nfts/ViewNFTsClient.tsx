"use client";

import { useMemo } from "react";
import Image from "next/image";
import { descriptions, protocols } from "~~/utils/protocolData";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// ────────────────────────────────────────────────────────────────────────────────
// 🃏  NFT Card (description fades in by color, not layout shift)
// ────────────────────────────────────────────────────────────────────────────────

type NFTCardProps = {
  id: number;
};

const cardBase = [
  "relative flex flex-col items-center rounded-2xl bg-slate-800/60",
  "p-4 shadow-xl shadow-black/30",
  "transition-transform duration-300 hover:scale-105 hover:shadow-emerald-500/40",
  "overflow-hidden group",
].join(" ");

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

  const protocol = useMemo(() => {
    const attr = meta?.attributes?.find(a => a.trait_type === "protocol");
    if (attr) return attr.value as string;
    const match = meta?.description?.match(/uses ([^ ]+) block/);
    return match?.[1];
  }, [meta]);

  const protocolIndex = protocol ? protocols.indexOf(protocol) : -1;
  const imageSrc = meta?.image ?? "";

  return (
    <div className={cardBase}>
      {/* IMAGE */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={`BlockMagician ${id}`}
          width={300}
          height={400}
          unoptimized
          className="w-48 h-auto rounded-xl shadow-md shadow-black/40"
        />
      ) : (
        <span className="mt-2 font-semibold text-emerald-300">Loading...</span>
      )}

      {/* BASIC INFO */}
      <span className="mt-3 text-xl font-bold text-emerald-300">#{id}</span>
      <span className="mt-1 font-medium text-cyan-200">{protocol}</span>
      {meta?.owner && (
        <div className="mt-1 text-sm text-slate-300 text-center break-all">
          Owner: <Address address={meta.owner} />
        </div>
      )}

      {/* DESCRIPTION — same bg colour by default, turns light on hover */}
      {protocolIndex >= 0 && (
        <p className="mt-2 text-center text-sm text-slate-800/0 group-hover:text-slate-200 transition-colors duration-300">
          {protocol}
          {descriptions[protocolIndex]}
        </p>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────────
// 📄  View NFTs Client Component
// ────────────────────────────────────────────────────────────────────────────────

const ViewNFTsClient: NextPage = () => {
  const { data: healthData } = useScaffoldReadContract({
    contractName: "BlockMagicians",
    functionName: "molochHealth",
  });

  const maxHealth = 1000;
  const minted = healthData ? maxHealth - Number(healthData) : 0;
  const ids = useMemo(() => {
    const arr: number[] = [];
    for (let i = minted; i > 0 && arr.length < 4; i--) arr.push(i);
    return arr;
  }, [minted]);

  return (
    <div>
      <h1 className="mb-10 text-center text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
        Latest Block&nbsp;Magicians
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {ids.map(id => (
          <NFTCard key={id} id={id} />
        ))}
      </div>
      {/* OpenSea Link */}
      <p className="mb-10 text-center">
        <a
          href="https://opensea.io/collection/blockmagicians"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-300 underline hover:text-cyan-200 transition-colors"
        >
          See on OpenSea
        </a>
      </p>
    </div>
  );
};

export default ViewNFTsClient;
