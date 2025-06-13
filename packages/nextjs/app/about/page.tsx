import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "About",
  description: "Learn more about Block Magicians",
});

const About: NextPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">About Block Magicians</h1>
      <p className="text-lg">
        Block Magicians is a playful dApp that lets you mint magical NFTs representing
        different blockchain protocols. Each mint weakens Moloch while supporting the
        BuidlGuidl and independent Web3 developers. Join the fight and collect them all!
      </p>
    </div>
  );
};

export default About;
