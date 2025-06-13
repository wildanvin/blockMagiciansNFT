"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const protocols = [
    "Base",
    "Bitcoin",
    "Celo",
    "Ethereum",
    "Gitcoin",
    "Kleros",
    "Monero",
    "Optimism",
    "UMA",
    "Uniswap",
  ];

  const descriptions = [
    "The agile illusionist who channels Coinbase’s strength into a fast, low-cost Layer-2 stage built on the OP Stack, inviting builders to conjure dApps with ease.",
    "The stoic grandmaster who introduced the world to peer-to-peer electronic cash, forging trustless value with cryptographic proof instead of intermediaries.",
    "The nimble enchantress who puts mobile first, casting carbon-negative spells to make ultra-light, low-fee payments accessible to everyone.",
    "The versatile archmage who transforms code into unstoppable smart contracts, powering a universe of decentralized applications on his global ledger.",
    "The generous benefactor whose quadratic-funding magic rallies communities to finance open-source public goods with fairness and impact.",
    "The impartial adjudicator whose decentralized jury spells deliver fast, affordable verdicts for Web3 disputes across realms.",
    "The shadow-weaver who cloaks every sender, receiver, and amount in ring signatures and stealth addresses, championing default privacy for all.",
    "The optimistic sorceress scaling Ethereum with rollup tricks, granting users cheaper, speedier transactions while preserving mainnet security.",
    "The truth-seeker who wields an Optimistic Oracle to anchor any verifiable fact on-chain, opening markets for limitless synthetic assets.",
    "The liquidity alchemist whose automated market-maker formula turns pooled tokens into constant, permissionless swaps for traders worldwide.",
  ];

  const websites = [
    "https://base.org",
    "https://bitcoin.org",
    "https://celo.org",
    "https://ethereum.org",
    "https://gitcoin.co",
    "https://kleros.io",
    "https://www.getmonero.org",
    "https://www.optimism.io",
    "https://uma.xyz",
    "https://uniswap.org",
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex flex-col items-center justify-center">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-5xl font-bold text-center mb-4">Moloch is attacking the world!</h1>
        <img src="svgs/Optimism.svg"></img>
        <p className="text-center text-lg mb-6">Mint a BlockMagician to fight back!</p>

        <div className="mb-6">
          <p className="mb-2 font-medium">Moloch Health:</p>
          <div className="w-full bg-gray-700 rounded-full h-6">
            <div
              className="bg-red-500 h-6 rounded-full transition-width duration-500"
              style={{ width: `${healthPercent}%` }}
            />
          </div>
          <p className="text-right text-sm mt-1">
            {health} / {maxHealth}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <button
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
            onClick={async () => {
              try {
                await mintOne({
                  functionName: "mintItem",
                  value: ethers.parseEther("0.001"),
                });
                updateRandomProtocol();
              } catch (e) {
                console.error("Error setting mintin 1:", e);
              }
            }}
            disabled={isMintingOne}
          >
            {isMintingOne ? "Minting..." : "Mint 1"}
          </button>

          <button
            className="bg-green-600 hover:bg-green-500 px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
            onClick={async () => {
              try {
                await mintThree({
                  functionName: "mintThree",
                  value: ethers.parseEther("0.003"),
                });
                updateRandomProtocol();
              } catch (e) {
                console.error("Error setting minting 3:", e);
              }
            }}
            disabled={isMintingThree}
          >
            {isMintingThree ? "Minting..." : "Mint 3"}
          </button>

          <button
            className="bg-yellow-600 hover:bg-yellow-500 px-4 py-3 rounded-lg font-semibold disabled:opacity-50"
            onClick={async () => {
              try {
                await mintTen({
                  functionName: "mintTen",
                  value: ethers.parseEther("0.01"),
                });
                updateRandomProtocol();
              } catch (e) {
                console.error("Error setting minting 10:", e);
              }
            }}
            disabled={isMintingTen}
          >
            {isMintingTen ? "Minting..." : "Mint 10"}
          </button>
        </div>

        <div className="my-6 flex flex-col items-center text-center">
          <Image
            src={`/svgs/${protocols[currentIndex]}.svg`}
            alt={`${protocols[currentIndex]} logo`}
            width={200}
            height={200}
            className="mb-4"
          />
          <p className="mb-2">{descriptions[currentIndex]}</p>
          <a
            href={websites[currentIndex]}
            className="text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {websites[currentIndex]}
          </a>
        </div>

        <div className="flex justify-center items-center space-x-2">
          <p className="font-medium">Your address:</p>
          <Address address={connectedAddress} />
        </div>
      </div>
    </div>
  );
};

export default Home;
