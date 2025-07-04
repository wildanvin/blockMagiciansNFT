"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import type { NextPage } from "next";
// import { useAccount } from "wagmi";
// import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { protocols, descriptions, websites } from "~~/utils/protocolData";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  const [currentIndex, setCurrentIndex] = useState(0);

  const updateRandomProtocol = () => {
    setCurrentIndex(Math.floor(Math.random() * protocols.length));
  };

  useEffect(() => {
    updateRandomProtocol();
  }, []);

  // Read Moloch health
  const { data: healthData } = useScaffoldReadContract({
    contractName: "BlockMagicians",
    functionName: "molochHealth",
  });
  const health = healthData ? parseInt(healthData.toString(), 10) : 0;
  const maxHealth = 1000;
  const healthPercent = Math.max(0, (health / maxHealth) * 100);

  // Mint hooks with correct usage
  const { writeContractAsync: mintOne, isMining: isMintingOne } = useScaffoldWriteContract("BlockMagicians");
  const { writeContractAsync: mintThree, isMining: isMintingThree } = useScaffoldWriteContract("BlockMagicians");
  const { writeContractAsync: mintTen, isMining: isMintingTen } = useScaffoldWriteContract("BlockMagicians");

  return (
    <section className="relative isolate min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-20 text-white">
      {/* decorative background glow */}
      <div className="absolute inset-0 -z-10 opacity-20 blur-[140px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-cyan-400/70 to-transparent" />

      <div className="mx-auto w-full max-w-2xl px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl shadow-black/40 p-8">
          <h3 className="text-center text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Moloch&nbsp;is&nbsp;attacking!
          </h3>
          <p className="text-center text-lg mb-8">Mint a Block&nbsp;Magician to fight back!</p>

          {/* Protocol showcase */}
          <div className="my-10 flex flex-col items-center text-center">
            <Image
              src={`/svgs/${protocols[currentIndex]}.svg`}
              alt={`${protocols[currentIndex]} logo`}
              width={260}
              height={300}
              className="mb-4 drop-shadow-lg"
            />
            <p className="mb-2">
              <a
                href={websites[currentIndex]}
                className="text-emerald-400 underline hover:text-cyan-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {protocols[currentIndex]}
              </a>
              {descriptions[currentIndex]}
            </p>
          </div>

          {/* Health bar */}
          <div className="mb-10">
            <p className="mb-2 font-medium">Moloch Health:</p>
            <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
              <div className="bg-red-500 h-6 transition-all duration-500" style={{ width: `${healthPercent}%` }} />
            </div>
            <p className="text-right text-sm mt-1">
              {health} / {maxHealth}
            </p>
          </div>

          {/* Info */}
          <div className="prose prose-invert prose-sm max-w-none mb-10">
            <p>
              Every Block&nbsp;Magician you mint removes <strong>one life point</strong> from Moloch.
              <br />
              Price: <strong>0.001 ETH</strong> per mint.
              <br />
              Collect all <strong>10 protocols</strong> that are fighting Moloch!
            </p>
            <p>
              Where your ETH goes:
              <br />• <strong>50&nbsp;%</strong> powers the{" "}
              <a
                href="https://buidlguidl.com/"
                target="_blank"
                className="text-emerald-400 underline hover:text-cyan-300"
                rel="noopener noreferrer"
              >
                BuidlGuidl
              </a>
              .
              <br />• <strong>50&nbsp;%</strong> supports your friendly Web3&nbsp;dev —{" "}
              <a
                href="https://x.com/wildanvin"
                className="text-emerald-400 underline hover:text-cyan-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                me
              </a>
              ! ✌️😁
            </p>
            <p>Would Moloch be defeated?... I think so.</p>
          </div>

          {/* Mint buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <button
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
              onClick={async () => {
                try {
                  await mintOne({ functionName: "mintItem", value: ethers.parseEther("0.001") });
                  updateRandomProtocol();
                } catch (e) {
                  console.error("Error minting 1:", e);
                }
              }}
              disabled={isMintingOne}
            >
              {isMintingOne ? "Minting…" : "Mint 1"}
            </button>

            <button
              className="bg-green-600 hover:bg-green-500 px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
              onClick={async () => {
                try {
                  await mintThree({ functionName: "mintThree", value: ethers.parseEther("0.003") });
                  updateRandomProtocol();
                } catch (e) {
                  console.error("Error minting 3:", e);
                }
              }}
              disabled={isMintingThree}
            >
              {isMintingThree ? "Minting…" : "Mint 3"}
            </button>

            <button
              className="bg-yellow-600 hover:bg-yellow-500 px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
              onClick={async () => {
                try {
                  await mintTen({ functionName: "mintTen", value: ethers.parseEther("0.01") });
                  updateRandomProtocol();
                } catch (e) {
                  console.error("Error minting 10:", e);
                }
              }}
              disabled={isMintingTen}
            >
              {isMintingTen ? "Minting…" : "Mint 10"}
            </button>
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
      </div>
    </section>
  );
};

export default Home;
