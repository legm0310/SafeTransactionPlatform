import { getBlockNumber } from "@thirdweb-dev/sdk";

export const getLatestBlocks = async (blockNumber) => {
  let latestBlock = await getBlockNumber({ network: "sepolia" });
  let fromBlock = latestBlock - blockNumber < 0 ? 0 : latestBlock - blockNumber;
  return fromBlock;
};
