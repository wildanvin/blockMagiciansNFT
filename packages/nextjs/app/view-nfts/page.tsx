import ViewNFTsClient from "./ViewNFTsClient";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "View NFTs",
  description: "Latest BlockMagicians minted",
});

export default function Page() {
  return <ViewNFTsClient />;
}
