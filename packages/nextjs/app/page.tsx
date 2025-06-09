"use client";

//import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
//import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl mb-2">Moloch is attacking the world!</span>
            <span className="block text-2xl">mint a blockMagician to fight it back!</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Last minted by:</p>
            <Address address={connectedAddress} />
          </div>

          <img src="OP.svg" alt="nftImage" />
        </div>
      </div>
    </>
  );
};

export default Home;
