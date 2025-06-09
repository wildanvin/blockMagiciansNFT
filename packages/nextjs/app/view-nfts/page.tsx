import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import ViewNFTsClient from "./ViewNFTsClient";

export const metadata = getMetadata({
  title: "View NFTs",
  description: "Latest BlockMagicians minted",
});

const ViewNFTs: NextPage = () => {
  return <ViewNFTsClient />;
};

export default ViewNFTs;
